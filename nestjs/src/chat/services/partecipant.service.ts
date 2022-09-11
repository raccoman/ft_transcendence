import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpsertPunishmentInput } from 'types/graphql';

@Injectable()
export class PartecipantService {

  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  public findAllByChannel(channel_id: string) {
    return this.prisma.partecipant.findMany({
      where: {
        channel_id,
      },
    });
  }

  public upsertPunishment(profile_id: number, input: UpsertPunishmentInput) {
    return this.prisma.$transaction(async (prisma: any) => {

      const channel = await prisma.channel.findUnique({
        include: {
          messages: true,
          partecipants: true,
        },
        where: { id: input.channel_id },
      });
      if (!channel)
        throw new Error('This channel does not exists.');

      const admin = await prisma.partecipant.findFirst({
        where: {
          profile_id,
          channel_id: input.channel_id,
        },
      });
      if (!admin)
        throw new Error('You are not in this channel.');

      if (admin.role === 'MEMBER')
        throw new Error('You don\'t have enough permissions.');

      const target = await prisma.partecipant.findFirst({
        where: {
          profile_id: input.profile_id,
          channel_id: input.channel_id,
        },
      });
      if (!target)
        throw new Error('This specified user is not a member of this channel.');

      if (target.role !== 'MEMBER' && admin.role !== 'OWNER')
        throw new Error('You don\'t have enough permissions.');

      const snapshot = await prisma.partecipant.update({
        where: {
          id: target.id,
        },
        data: {
          muted: input.type === 'MUTE' ? !input.removed : target.muted,
          banned: input.type === 'BAN' ? !input.removed : target.banned,
        },
      });
      if (!snapshot)
        throw new Error('An error occurred while updating.');

      return channel;
    });
  }

}