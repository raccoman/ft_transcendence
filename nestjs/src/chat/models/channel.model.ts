import { Field, ObjectType } from '@nestjs/graphql';
import { Message } from './message.model';
import { Partecipant } from './partecipant.model';

@ObjectType()
export class Channel {

  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field({ nullable: true })
  password?: string;

  @Field(type => [Message])
  messages: Message[];

  @Field(type => [Partecipant])
  partecipants: Partecipant[];

}