import { Field, Int, ObjectType } from '@nestjs/graphql';

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

  @Field((type) => Date)
  updated_at: Date;
}