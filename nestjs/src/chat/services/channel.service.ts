import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JoinChannelInput, SendMessageInput } from 'src/chat/chat.resolver';


const msToTime = (s) => {
  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;
  const hrs = (s - mins) / 60;

  return hrs + ':' + mins + ':' + secs + '.' + ms;
};

@Injectable()
export class ChannelService {

  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  public findUnique(id: string) {
    return this.prisma.channel.findUnique({
      where: { id },
    });
  }

  public findAllByProfile(profile_id: number) {
    return this.prisma.channel.findMany({
      where: {
        partecipants: {
          some: {
            profile_id,
          },
        },
      },
    });
  }

  public findAll() {
    return this.prisma.channel.findMany();
  }

  public create(profile_id: number, name: string) {
    return this.prisma.$transaction(async (prisma: any) => {

      const channel = await prisma.channel.create({
        include: {
          messages: true,
          partecipants: true,
          punishments: true,
        },
        data: {
          name,
          partecipants: {
            create: [
              {
                profile_id,
                role: 'OWNER',
              },
            ],
          },
        },
      });
      if (!channel)
        throw new Error('Could not create channel.');
      return channel;
    });
  }

  public join(profile_id: number, input: JoinChannelInput) {
    return this.prisma.$transaction(async (prisma: any) => {
      const channel = await prisma.channel.findUnique({
        include: {
          messages: true,
          partecipants: true,
          punishments: true,
        },
        where: { id: input.id },
      });
      if (!channel)
        throw new Error('This channel does not exists.');

      if (channel.type === 'PROTECTED' && input.password !== channel.password) {
        throw new Error('Invalid password!');
      }

      const joined = await prisma.partecipant.findFirst({
        where: {
          profile_id,
          channel_id: input.id,
        },
      });
      if (joined)
        throw new Error('You already joined this channel.');

      const punishment = await prisma.punishment.findFirst({
        where: {
          profile_id,
          channel_id: input.id,
        },
      });
      if (punishment && punishment.type === 'BAN') {

        if (punishment.duration == -1)
          throw new Error('You are permanently banned from this channel');

        const current = new Date().valueOf();
        const issued_at = new Date(punishment.issued_at).valueOf();
        if (current < issued_at + punishment.duration)
          throw new Error('You are banned from this channel for ' + msToTime(current) + '.');
      }

      const partecipant = await prisma.partecipant.create({
        data: {
          profile_id,
          channel_id: input.id,
          role: 'MEMBER',
        },
      });
      if (!partecipant)
        throw new Error('Could not create partecipant for channel');

      channel.partecipants = [...channel.partecipants, partecipant];
      return channel;
    });
  }

  public sendMessage(profile_id: number, input: SendMessageInput) {
    return this.prisma.$transaction(async (prisma: any) => {

      const channel = await prisma.channel.findUnique({
        include: {
          messages: true,
          partecipants: true,
          punishments: true,
        },
        where: { id: input.id },
      });
      if (!channel)
        throw new Error('This channel does not exists.');

      const joined = await prisma.partecipant.findFirst({
        where: {
          profile_id,
          channel_id: input.id,
        },
      });
      if (!joined)
        throw new Error('You are not in this channel.');

      const punishment = await prisma.punishment.findFirst({
        where: {
          profile_id,
          channel_id: input.id,
        },
      });
      if (punishment && punishment.type === 'MUTE') {

        if (punishment.duration == -1)
          throw new Error('You are permanently muted in this channel');

        const current = new Date().valueOf();
        const issued_at = new Date(punishment.issued_at).valueOf();
        if (current < issued_at + punishment.duration)
          throw new Error('You are muted in this channel for ' + msToTime(current) + '.');
      }

      const message = await prisma.message.create({
        data: {
          profile_id,
          channel_id: input.id,
          text: input.text,
        },
      });
      if (!message)
        throw new Error('Could not create message.');

      channel.messages = [...channel.messages, message];
      return channel;
    });
  }


}