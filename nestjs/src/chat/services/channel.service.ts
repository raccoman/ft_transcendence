import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChannelInput, JoinChannelInput, SendMessageInput } from 'src/chat/chat.resolver';

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

  public create(profile_id: number, input: CreateChannelInput) {
    return this.prisma.$transaction(async (prisma: any) => {

      const exists = await prisma.channel.findFirst({
        where: {
          name: {
            equals: input.name,
            mode: 'insensitive',
          },
        },
      });
      if (exists)
        throw new Error('A channel with this name already exists.');

      const channel = await prisma.channel.create({
        include: {
          messages: true,
          partecipants: true,
        },
        data: {
          name: input.name,
          type: input.password ? 'PROTECTED' : 'PUBLIC',
          password: input.password,
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
        },
        where: { id: input.id },
      });
      if (!channel)
        throw new Error('This channel does not exists.');

      if (channel.type === 'PROTECTED' && input.password !== channel.password) {
        throw new Error('Invalid password!');
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
        },
        where: { id: input.id },
      });
      if (!channel)
        throw new Error('This channel does not exists.');

      const partecipant = await prisma.partecipant.findFirst({
        where: {
          profile_id,
          channel_id: input.id,
        },
      });
      if (!partecipant)
        throw new Error('You are not in this channel.');

      if (partecipant.muted)
        throw new Error('You are permanently muted in this channel');

      if (partecipant.banned)
        throw new Error('You are permanently banned from this channel');

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