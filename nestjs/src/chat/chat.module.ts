import { Module } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';
import { ChannelService } from './services/channel.service';
import { MessageService } from './services/message.service';
import { PartecipantService } from './services/partecipant.service';
import { ChannelResolver } from './resolvers/channel.resolver';
import { MessageResolver } from './resolvers/message.resolver';
import { PartecipantResolver } from './resolvers/partecipant.resolver';
import { ChatResolver } from 'src/chat/chat.resolver';

@Module({
  providers: [
    ProfileService,
    ChannelService,
    MessageService,
    PartecipantService,
    ChannelResolver,
    MessageResolver,
    PartecipantResolver,
    ChatResolver,
  ],
})
export class ChatModule {
}
