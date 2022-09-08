import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Match } from 'src/game/models/match.model';
import { type } from 'os';
import { Profile } from 'src/profile/models/profile.model';

@ObjectType()
export class Background {

  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  rarity: string;

  @Field(type => Int)
  price: number;
}