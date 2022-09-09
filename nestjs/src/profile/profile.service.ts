import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {

  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  public findUnique(id: number, secret: boolean) {
    return this.prisma.profile.findUnique({
      //TODO: Exclude these fields
      // select: {
      //   twofa_secret: secret,
      //   twofa_enabled: secret,
      // },
      where: {
        id,
      },
      include: {
        wins: true,
        defeats: true,
        backgrounds: true,
      },
    });
  }

  public create({ id, username, email, avatar }: any) {
    return this.prisma.profile.create({
      data: {
        id,
        username,
        email,
        avatar,
      },
      include: {
        wins: true,
        defeats: true,
        backgrounds: true,
      },
    });
  }

  public update(id: number, data: any) {
    return this.prisma.profile.update({
      where: {
        id,
      },
      include: {
        wins: true,
        defeats: true,
        backgrounds: true,
      },
      data,
    });
  }

  public findTop100() {
    return this.prisma.profile.findMany({
      take: 100,
      orderBy: {
        rp: 'desc',
      },
    });
  }

}


