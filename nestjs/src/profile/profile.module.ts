import { Module } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';
import { ProfileResolver } from 'src/profile/profile.resolver';

@Module({
  providers: [ProfileService, ProfileResolver],
})
export class ProfileModule {
}
