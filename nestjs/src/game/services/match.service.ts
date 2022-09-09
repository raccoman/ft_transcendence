import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Match, MatchType } from 'types';

@Injectable()
export class MatchService {

  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  public findUnique(id: string) {
    return this.prisma.channel.findUnique({
      where: { id },
    });
  }

  public findAllByWinner(id: number) {
    return this.prisma.match.findMany({
      where: { winner_id: id },
    });
  }

  public findAllByLoser(id: number) {
    return this.prisma.match.findMany({
      where: { loser_id: id },
    });
  }

  public upsert(match: Match) {

    const index = match.players.findIndex(x => x.lives > 0);
    if (index < 0) {
      return;
    }

    return this.prisma.$transaction(async (prisma) => {

      const snapshot = await this.prisma.match.create({
        data: {
          winner_id: match.players.at(index).profile.id,
          loser_id: match.players.at(index - 1).profile.id,
          type: MatchType[match.settings.type],
          started_at: match.timings.started_at,
        },
      });
      if (!snapshot) {
        throw new Error('Unable to save match.');
      }

      for (const player of match.players) {

        const isWinner = player.lives > 0;
        const isRanked = match.settings.type == MatchType.RANKED_1vs1;

        const updated = await this.prisma.profile.update({
          where: {
            id: player.profile.id,
          },
          data: {
            gems: {
              increment: isWinner ? 25 : 5,
            },
            rp: {
              increment: isRanked ? (isWinner ? 15 : -10) : 0,
            },
          },
        });
        if (!updated) {
          throw new Error('Unable to save profile statistics.');
        }

      }

      return true;
    });
  }

}