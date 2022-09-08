import { Args, Context, Field, InputType, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Background } from 'src/assets/models/background.model';
import { UseGuards } from '@nestjs/common';
import { Jwt2FAGuard } from 'src/auth/guards/jwt-2fa.guard';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as path from 'path';
import { createWriteStream } from 'fs';
import { BackgroundService } from 'src/assets/services/background.service';


@InputType()
export class UploadBackgroundInput {

  @Field()
  name: string;

  @Field()
  rarity: string;

  @Field(type => Int)
  price: number;

}

@Resolver(of => Background)
export class BackgroundResolver {

  constructor(
    private readonly backgroundService: BackgroundService,
  ) {
  }

  @UseGuards(Jwt2FAGuard)
  @Mutation(() => Boolean, { name: 'upload_background' })
  async upload(@Context() context,
               @Args('input') input: UploadBackgroundInput,
               @Args({ name: 'file', type: () => GraphQLUpload }) {
                 createReadStream,
                 filename,
               }: any): Promise<boolean> {

    const { name, rarity, price } = input;

    const background = await this.backgroundService.create({
      name, rarity, price,
    });

    if (!background) {
      return false;
    }

    const dest = background.id + path.parse(filename).ext;
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/backgrounds/${dest}`))
        .on('finish', () => resolve(true))
        .on('error', () => resolve(false)),
    );
  }

  @UseGuards(Jwt2FAGuard)
  @Query(() => [Background], { name: 'backgrounds' })
  async getBackgrounds(@Context() context) {
    return this.backgroundService.findMany();
  }

}