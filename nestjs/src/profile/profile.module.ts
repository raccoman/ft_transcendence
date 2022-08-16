import { Module } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';
import { ProfileResolver } from 'src/profile/profile.resolver';
import { MatchService } from 'src/game/services/match.service';

@Module({
  providers: [ProfileService, ProfileResolver, MatchService],
})
export class ProfileModule {
}
