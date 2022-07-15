import {
  Args,
  Context,
  Field,
  InputType, Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PartecipantService } from 'src/chat/services/partecipant.service';
import { MessageService } from 'src/chat/services/message.service';
import { ChannelService } from 'src/chat/services/channel.service';
import { Channel } from './models/channel.model';
import { PubsubService } from 'src/pubsub/pubsub.service';

@InputType()
export class CreateChannelInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  password?: string;
}

@InputType()
export class JoinChannelInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  password?: string;
}

@InputType()
export class SendMessageInput {
  @Field()
  id: string;

  @Field()
  text: string;
}

@InputType()
export class UpsertPunishmentInput {

  @Field()
  channel_id: string;

  @Field(type => Int)
  profile_id: number;

  @Field()
  type: string;

  @Field({ nullable: true })
  removed?: boolean;
}


@Resolver()
export class ChatResolver {

  constructor(
    private partecipantService: PartecipantService,
    private messageService: MessageService,
    private channelService: ChannelService,
    private pubSubService: PubsubService,
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Query(returns => [Channel])
  async channels(@Context() context) {
    return await this.channelService.findAll();
    // return await this.channelService.findAllByProfile(context.req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(returns => Channel, { name: 'create_channel' })
  async createChannel(@Context() context, @Args('input') input: CreateChannelInput) {
    const channel = await this.channelService.create(context.req.user.id, input);
    if (channel) {
      await this.pubSubService.publish('CHANNEL', { channel });
    }
    return channel;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(returns => Channel, { name: 'leave_channel' })
  async leaveChannel(@Context() context, @Args('id') id: string) {
    const channel = await this.channelService.leave(context.req.user.id, id);
    if (channel) {
      await this.pubSubService.publish('CHANNEL', { channel });
    }
    return channel;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(returns => Channel, { name: 'join_channel' })
  async joinChannel(@Context() context, @Args('input') input: JoinChannelInput) {
    const channel = await this.channelService.join(context.req.user.id, input);
    if (channel) {
      await this.pubSubService.publish('CHANNEL', { channel });
    }
    return channel;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(returns => Channel, { name: 'send_message' })
  async sendMessage(@Context() context, @Args('input') input: SendMessageInput) {
    const channel = await this.channelService.sendMessage(context.req.user.id, input);
    if (channel) {
      await this.pubSubService.publish('CHANNEL', { channel });
    }
    return channel;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(returns => Channel, { name: 'upsert_punishment' })
  async upsertPunishment(@Context() context, @Args('input') input: UpsertPunishmentInput) {
    const channel = await this.partecipantService.upsertPunishment(context.req.user.id, input);
    if (channel) {
      await this.pubSubService.publish('CHANNEL', { channel });
    }
    return channel;
  }

  @UseGuards(JwtAuthGuard)
  @Subscription(returns => Channel, {
    name: 'channel',
    filter: ({ channel }, variables, { req }) => {
      return channel.partecipants.filter(partecipant => partecipant.profile_id === req.user.id);
    },
  })
  async onChannelUpdate(@Context() context) {
    return await this.pubSubService.subscribe('CHANNEL');
  }

}