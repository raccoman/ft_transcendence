import { Module } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';
import { ProfileResolver } from 'src/profile/profile.resolver';
import { MatchService } from 'src/game/services/match.service';
import { ProfileController } from 'src/profile/profile.controller';
import { TwoFactorAuthService } from 'src/auth/services/2fa.service';

@Module({
  providers: [ProfileService, ProfileResolver, MatchService, TwoFactorAuthService],
  controllers: [ProfileController],
})
export class ProfileModule {
}
