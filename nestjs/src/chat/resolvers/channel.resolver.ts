import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Channel } from 'src/chat/models/channel.model';
import { MessageService } from 'src/chat/services/message.service';
import { PartecipantService } from 'src/chat/services/partecipant.service';
import { PunishmentService } from 'src/chat/services/punishment.service';

@Resolver(of => Channel)
export class ChannelResolver {

  constructor(
    private punishmentService: PunishmentService,
    private partecipantService: PartecipantService,
    private messageSerivce: MessageService,
  ) {
  }

  @ResolveField()
  async messages(@Parent() channel: Channel) {
    const { id } = channel;
    return this.messageSerivce.findAllByChannel(id);
  }

  @ResolveField()
  async partecipants(@Parent() channel: Channel) {
    const { id } = channel;
    return this.partecipantService.findAllByChannel(id);
  }

  @ResolveField()
  async punishments(@Parent() channel: Channel) {
    const { id } = channel;
    return this.punishmentService.findAllByChannel(id);
  }


}