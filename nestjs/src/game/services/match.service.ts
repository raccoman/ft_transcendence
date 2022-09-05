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

    const winner = match.players.find(x => x.lives > 0);
    const loser = match.players.find(x => x.lives <= 0);

    return this.prisma.match.create({
      data: {
        winner_id: winner.id,
        loser_id: loser.id,
        type: MatchType[match.settings.type],
        started_at: match.timings.started_at,
      },
    });
  }

}