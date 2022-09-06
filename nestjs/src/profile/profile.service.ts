import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {

  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  public findUnique(id: number) {
    return this.prisma.profile.findUnique({
      where: {
        id,
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
      },
      data,
    });
  }

  public findFollowing(id: number) {
    return this.prisma.profile.findMany({
      where: {
        followedBy: {
          every: {
            id
          }
        }
      },
    });
  }

}


