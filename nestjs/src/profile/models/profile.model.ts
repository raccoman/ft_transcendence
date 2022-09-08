import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Match } from 'src/game/models/match.model';
import { Background } from 'src/assets/models/background.model';

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

  @Field(type => Int)
  active_bg: number;

  @Field(type => [Background])
  backgrounds: Background[];

  @Field((type) => Date)
  updated_at: Date;
}