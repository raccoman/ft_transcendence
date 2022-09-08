import { Global, Module } from '@nestjs/common';
import { AssetsController } from 'src/assets/assets.controller';
import { BackgroundResolver } from 'src/assets/resolvers/background.resolver';
import { BackgroundService } from 'src/assets/services/background.service';
import { ProfileService } from 'src/profile/profile.service';

@Global()
@Module({
  providers: [BackgroundResolver, BackgroundService, ProfileService],
  controllers: [AssetsController],
})
export class AssetsModule {
}
