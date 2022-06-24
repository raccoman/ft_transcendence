import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Message } from './message.model';

@InputType()
export class SendMessageInput {

  @Field()
  channel_id: string;

  @Field()
  text: string;
}

@InputType()
export class CreateChannelInput {

  @Field()
  name: string;

  @Field({nullable: true})
  type?: string;

  @Field({nullable: true})
  password?: string;
}

@ObjectType()
export class Channel {

  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  password: string;

  @Field(type => [Message])
  messages: Message[];
}