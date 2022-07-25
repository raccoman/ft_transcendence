import { Injectable} from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class PubsubService {

  private pubSub = new PubSub();

  constructor() {
  }

  public subscribe(channel: string) {
    return this.pubSub.asyncIterator(channel);
  }

  public publish(triggerName: string, payload: any) {
    return this.pubSub.publish(triggerName, payload);
  }

}