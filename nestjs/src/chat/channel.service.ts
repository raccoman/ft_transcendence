import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChannelService {

  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  public findUnique(id: string) {
    return this.prisma.channel.findUnique({
      where: {
        id,
      },
    });
  }

  public create({ name, type, password }: any) {
    return this.prisma.channel.create({
      data: {
        name,
        type,
        password: password ?? '',
      },
    });
  }

}


