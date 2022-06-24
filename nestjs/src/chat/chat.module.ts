import { Module } from '@nestjs/common';
import { MessageService } from 'src/chat/message.service';
import { ChannelResolver } from './channel.resolver';
import { ChannelService } from './channel.service';
import { MessageResolver } from 'src/chat/message.resolver';
import { ProfileService } from 'src/profile/profile.service';
import { ChatService } from 'src/chat/chat.service';

@Module({
  providers: [
    ProfileService,
    ChatService,
    MessageService,
    ChannelService,
    MessageResolver,
    ChannelResolver,
  ],
})
export class ChatModule {
}
