import { Field, GraphQLTimestamp, Int, ObjectType } from '@nestjs/graphql';
import { Channel } from './channel.model';
import { Profile } from 'src/profile/models/profile.model';

@ObjectType()
export class Punishment {

  @Field()
  id: string;

  @Field(type => Channel)
  channel: Channel;

  @Field()
  channel_id: string;

  @Field(type => Profile)
  profile: Profile;

  @Field(type => Int)
  profile_id: number;

  @Field()
  type: string;

  @Field(type => GraphQLTimestamp)
  duration: number;

  @Field(type => GraphQLTimestamp)
  issued_at: number;

}