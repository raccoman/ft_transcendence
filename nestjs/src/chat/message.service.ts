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

  public create({ channel_id, sender_id, text }: any) {
    return this.prisma.message.create({
      data: {
        channel_id,
        sender_id,
        text,
      },
    });
  }
}


