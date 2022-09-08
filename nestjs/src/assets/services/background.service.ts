import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BackgroundService {

  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  public findMany() {
    return this.prisma.background.findMany();
  }

  public findUnique(id: string) {
    return this.prisma.background.findUnique({
      where: {
        id,
      },
    });
  }

  public create({ name, rarity, price }: any) {
    return this.prisma.background.create({
      data: {
        name,
        rarity,
        price,
      },
    });
  }

  public findAllByOwner(id: number) {
    return this.prisma.background.findMany({
      where: {
        owners: {
          every: {
            id,
          },
        },
      },
    });
  }
}