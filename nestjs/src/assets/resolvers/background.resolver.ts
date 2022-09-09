import { Args, Context, Field, InputType, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Background } from 'src/assets/models/background.model';
import { UseGuards } from '@nestjs/common';
import { Jwt2FAGuard } from 'src/auth/guards/jwt-2fa.guard';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as path from 'path';
import { createWriteStream } from 'fs';
import { BackgroundService } from 'src/assets/services/background.service';
import { GraphQLString } from 'graphql/type';
import { ProfileService } from 'src/profile/profile.service';


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
    private readonly profileService: ProfileService,
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

  @UseGuards(Jwt2FAGuard)
  @Mutation(() => Boolean, { name: 'purchase_background' })
  async purchaseBackground(@Context() context, @Args({ name: 'id', type: () => GraphQLString }) id): Promise<boolean> {

    const { req } = context;

    const profile = await this.profileService.findUnique(req.user.id);
    if (!profile) {
      return false;
    }

    const background = await this.backgroundService.findUnique(id);
    if (!background) {
      return false;
    }

    if (profile.gems < background.price) {
      return false;
    }

    const snapshot = await this.profileService.update(req.user.id, {
      gems: {
        decrement: background.price,
      },
      backgrounds: {
        connect: {
          id: background.id,
        },
      },
    });

    return snapshot != null;
  }

}