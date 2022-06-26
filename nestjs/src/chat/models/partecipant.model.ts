import { Field, GraphQLTimestamp, Int, ObjectType } from '@nestjs/graphql';
import { Channel } from './channel.model';
import { Profile } from 'src/profile/models/profile.model';

@ObjectType()
export class Partecipant {

  @Field()
  id: string;

  @Field(type => Profile)
  profile: Profile;

  @Field(type => Int)
  profile_id: number;

  @Field(type => Channel)
  channel: Channel;

  @Field()
  channel_id: string;

  @Field()
  role: string;

}