import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Profile } from 'src/profile/models/profile.model';

@ObjectType()
export class Match {

  @Field()
  id: string;

  @Field(type => Profile)
  winner: Profile;

  @Field(type => Int)
  winner_id: number;

  @Field(type => Profile)
  loser: Profile;

  @Field(type => Int)
  loser_id: number;

  @Field()
  type: string;

  @Field(type => Date)
  started_at: string;

}