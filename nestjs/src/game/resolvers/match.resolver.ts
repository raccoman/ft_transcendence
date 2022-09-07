import { Context, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProfileService } from 'src/profile/profile.service';
import { Match } from 'src/game/models/match.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MeResponse } from 'src/profile/profile.resolver';
import { Profile } from 'src/profile/models/profile.model';
import { Jwt2FAGuard } from 'src/auth/guards/jwt-2fa.guard';

@Resolver(of => Match)
export class MatchResolver {

  constructor(
    private profileService: ProfileService,
  ) {
  }

  @ResolveField()
  async winner(@Parent() match: Match) {
    const { winner_id } = match;
    return this.profileService.findUnique(winner_id, false);
  }

  @ResolveField()
  async loser(@Parent() match: Match) {
    const { loser_id } = match;
    return this.profileService.findUnique(loser_id, false);
  }

  @UseGuards(Jwt2FAGuard)
  @Query(() => [Profile], { name: 'top_100' })
  async top100(@Context() context) {
    const { req } = context;
    return this.profileService.findTop100();
  }


}