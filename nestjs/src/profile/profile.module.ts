import { Module } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';
import { ProfileResolver } from 'src/profile/profile.resolver';
import { MatchService } from 'src/game/services/match.service';
import { TwoFactorAuthService } from 'src/auth/services/2fa.service';
import { BackgroundService } from 'src/assets/services/background.service';

@Module({
  providers: [ProfileService, ProfileResolver, MatchService, TwoFactorAuthService, BackgroundService],
})
export class ProfileModule {
}
