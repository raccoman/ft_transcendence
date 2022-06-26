import { Global, Injectable, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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