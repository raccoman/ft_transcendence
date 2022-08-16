import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProfileService } from 'src/profile/profile.service';
import { Match } from 'src/game/models/match.model';

@Resolver(of => Match)
export class MatchResolver {

  constructor(
    private profileService: ProfileService,
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

}