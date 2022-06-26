import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

}