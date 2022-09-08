import { Global, Module } from '@nestjs/common';
import { AssetsController } from 'src/assets/assets.controller';
import { BackgroundResolver } from 'src/assets/resolvers/background.resolver';
import { BackgroundService } from 'src/assets/services/background.service';

@Global()
@Module({
  providers: [BackgroundResolver, BackgroundService],
  controllers: [AssetsController],
})
export class AssetsModule {
}
