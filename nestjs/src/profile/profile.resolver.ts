import { Context, Query, Resolver } from '@nestjs/graphql';
import { Profile } from 'src/profile/models/profile.model';
import { ProfileService } from 'src/profile/profile.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Resolver(of => Profile)
export class ProfileResolver {

  constructor(
    private profile: ProfileService,
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Query((returns) => Profile, { nullable: true })
  async me(@Context() context) {
    const { req } = context;
    return await this.profile.findUnique(req.user.id);
  }

}