import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Match } from 'src/game/models/match.model';

@ObjectType()
export class Profile {

  @Field(type => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  avatar: string;

  @Field(type => Int)
  gems: number;

  @Field(type => Int)
  rp: number;

  @Field({ nullable: true })
  twofa_secret: string;

  @Field()
  twofa_enabled: boolean;

  @Field(type => [Match])
  wins: Match[];

  @Field(type => [Match])
  defeats: Match[];

  @Field((type) => Date)
  updated_at: Date;
}