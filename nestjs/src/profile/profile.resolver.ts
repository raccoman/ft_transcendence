import { Context, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Profile } from 'src/profile/models/profile.model';
import { ProfileService } from 'src/profile/profile.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MatchService } from 'src/game/services/match.service';

@Resolver(of => Profile)
export class ProfileResolver {

  constructor(
    private profileService: ProfileService,
    private matchService: MatchService,
  ) {
  }

  @ResolveField()
  async wins(@Parent() profile: Profile) {
    const { id } = profile;
    return this.matchService.findAllByWinner(id);
  }

  @ResolveField()
  async defeats(@Parent() profile: Profile) {
    const { id } = profile;
    return this.matchService.findAllByLoser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Profile, { nullable: true })
  async me(@Context() context) {
    const { req } = context;
    return await this.profileService.findUnique(req.user.id);
  }

}