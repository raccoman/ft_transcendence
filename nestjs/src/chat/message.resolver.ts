import { Context, Parent, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { ChannelService } from './channel.service';
import { Message } from 'src/chat/models/message.model';
import { PubSub, withFilter } from 'graphql-subscriptions';
import { ProfileService } from 'src/profile/profile.service';
import { MessageService } from 'src/chat/message.service';
import { ChatService } from 'src/chat/chat.service';
import { ResolverFn } from 'graphql-subscriptions/dist/with-filter';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Resolver(of => Message)
export class MessageResolver {

  constructor(
    private readonly profilesService: ProfileService,
    private readonly chatService: ChatService,
    private readonly channelsService: ChannelService,
    private readonly messagesService: MessageService,
  ) {
  }

  @ResolveField()
  async channel(@Parent() message: Message) {
    const { channel_id } = message;
    return this.channelsService.findUnique(channel_id);
  }

  @ResolveField()
  async sender(@Parent() message: Message) {
    const { sender_id } = message;
    return this.profilesService.findUnique(sender_id);
  }

  @UseGuards(JwtAuthGuard)
  @Subscription((returns) => Message)
  async onMessage(@Context() context): Promise<any> {
    const { req } = context;
    return withFilter(
      () => this.chatService.subscribe('MESSAGE-SYNC'),
      (payload, variables) => {
        return this.chatService.hasJoined(req.user.id, payload.channel_id);
      },
    )();
  }

}