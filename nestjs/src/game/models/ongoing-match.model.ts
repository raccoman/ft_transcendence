import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OnGoingMatchProfile {

  @Field(type => Int)
  id: number;

  @Field()
  avatar: string;

  @Field()
  username: string;

  @Field(type => Int)
  lives: number;

}

@ObjectType()
export class OnGoingMatch {

  @Field()
  id: string;

  @Field(type => [OnGoingMatchProfile])
  players: OnGoingMatchProfile[];

  @Field()
  type: string;

  @Field()
  state: string;

  @Field(type => Int)
  elapsed: number;

}