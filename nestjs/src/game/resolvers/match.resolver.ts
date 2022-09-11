import { Context, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { ProfileService } from 'src/profile/profile.service';
import { Match } from 'src/game/models/match.model';
import { UseGuards } from '@nestjs/common';
import { Profile } from 'src/profile/models/profile.model';
import { Jwt2FAGuard } from 'src/auth/guards/jwt-2fa.guard';
import { PubsubService } from 'src/pubsub/pubsub.service';
import { OnGoingMatch } from 'src/game/models/ongoing-match.model';
import { GameService } from 'src/game/services/game.service';

@Resolver(of => Match)
export class MatchResolver {

  constructor(
    private gameService: GameService,
    private profileService: ProfileService,
    private pubSubService: PubsubService,
  ) {
  }

  @ResolveField()
  async winner(@Parent() match: Match) {
    const { winner_id } = match;
    return this.profileService.findUnique(winner_id);
  }

  @ResolveField()
  async loser(@Parent() match: Match) {
    const { loser_id } = match;
    return this.profileService.findUnique(loser_id);
  }

  @UseGuards(Jwt2FAGuard)
  @Query(() => [Profile], { name: 'top_100' })
  async top100(@Context() context) {
    const { req } = context;
    return this.profileService.findTop100();
  }

  @UseGuards(Jwt2FAGuard)
  @Query(returns => [OnGoingMatch], { name: 'matches' })
  async onGoingMatches(@Context() context) {
    return this.gameService.ongoing();
  }


  @UseGuards(Jwt2FAGuard)
  @Subscription(returns => OnGoingMatch, { name: 'matches' })
  async onMatchUpdate(@Context() context) {
    return this.pubSubService.subscribe('MATCH');
  }

}