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

}


