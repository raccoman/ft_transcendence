import { Args, Context, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Channel, CreateChannelInput, SendMessageInput } from 'src/chat/models/channel.model';
import { MessageService } from 'src/chat/message.service';
import { ChannelService } from './channel.service';
import { Message } from './models/message.model';
import { ChatService } from 'src/chat/chat.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Resolver(of => Channel)
export class ChannelResolver {

  constructor(
    private readonly chatService: ChatService,
    private readonly channelsService: ChannelService,
    private readonly messagesService: MessageService,
  ) {
  }

  @ResolveField()
  async messages(@Parent() channel: Channel) {
    const { id } = channel;
    return await this.messagesService.findAllByChannel(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(returns => Message)
  async sendMessage(@Context() context, @Args('input') input: SendMessageInput) {

    const { req: { user } } = context;

    const message = await this.messagesService.create({
      channel_id: input.channel_id,
      sender_id: user.id,
      text: input.text,
    });

    await this.chatService.publish('MESSAGE-SYNC', message);

    return message;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(returns => Channel)
  async createChannel(@Context() context, @Args('input') input: CreateChannelInput) {

    const { req: { user } } = context;

    const channel = await this.channelsService.create({
      name: input.name,
      type: input.type,
      password: input.password,
    });

    this.chatService.create(user.id, channel.id);
    await this.chatService.publish('CHANNEL-SYNC', channel);
    return channel;
  }
}