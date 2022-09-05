import { Module } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';
import { ProfileResolver } from 'src/profile/profile.resolver';
import { MatchService } from 'src/game/services/match.service';
import { ProfileController } from 'src/profile/profile.controller';

@Module({
  providers: [ProfileService, ProfileResolver, MatchService],
  controllers: [ProfileController]
})
export class ProfileModule {
}
