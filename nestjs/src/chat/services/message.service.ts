import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {

  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  public findAllByChannel(channel_id: string) {
    return this.prisma.message.findMany({
      where: {
        channel_id,
      },
    });
  }

}