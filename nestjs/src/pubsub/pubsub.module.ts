import { Global, Module } from '@nestjs/common';
import { PubsubService } from 'src/pubsub/pubsub.service';

@Global()
@Module({
  providers: [PubsubService],
  exports: [PubsubService],
})
export class PubsubModule {
}
