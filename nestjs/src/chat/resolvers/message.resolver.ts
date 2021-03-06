import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Message } from 'src/chat/models/message.model';
import { ChannelService } from 'src/chat/services/channel.service';
import { ProfileService } from 'src/profile/profile.service';

@Resolver(of => Message)
export class MessageResolver {

  constructor(
    private channelService: ChannelService,
    private profileService: ProfileService,
  ) {
  }

  @ResolveField()
  async channel(@Parent() message: Message) {
    const { channel_id } = message;
    return this.channelService.findUnique(channel_id);
  }

  @ResolveField()
  async profile(@Parent() message: Message) {
    const { profile_id } = message;
    return this.profileService.findUnique(profile_id);
  }

}