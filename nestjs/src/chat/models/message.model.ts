import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Channel } from './channel.model';
import { Profile } from 'src/profile/models/profile.model';

@ObjectType()
export class Message {

  @Field()
  id: string;

  @Field(type => Channel)
  channel: Channel;

  @Field()
  channel_id: string;

  @Field(type => Profile)
  sender: Profile;

  @Field((type) => Int)
  sender_id: number;

  @Field()
  text: string;

  @Field((type) => Date)
  updated_at: Date;
}