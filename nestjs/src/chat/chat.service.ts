import { PubSub } from 'graphql-subscriptions';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {

  private channels = new Map<number, string[]>();
  private pubSub = new PubSub();

  constructor() {
  }

  public create(profile: number, channel: string) {
    const channels = this.channels.get(profile) ?? [];
    channels.push(channel);

    return this.channels.set(profile, channels);
  }

  public hasJoined(profile: number, channel: string) {

    if (!this.channels.has(profile))
      return false;

    return this.channels.get(profile).includes(channel);
  }

  public subscribe(channel: string) {
    return this.pubSub.asyncIterator(channel);
  }

  public publish(triggerName: string, payload: any) {
    return this.pubSub.publish(triggerName, payload);
  }

}