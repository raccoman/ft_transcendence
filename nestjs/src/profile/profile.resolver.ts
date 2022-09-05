import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Profile } from 'src/profile/models/profile.model';
import { ProfileService } from 'src/profile/profile.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MatchService } from 'src/game/services/match.service';
import { createWriteStream } from 'fs';
import * as path from 'path';

import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@Resolver(of => Profile)
export class ProfileResolver {

  constructor(
    private profileService: ProfileService,
    private matchService: MatchService,
  ) {
  }

  @ResolveField()
  async wins(@Parent() profile: Profile) {
    const { id } = profile;
    return this.matchService.findAllByWinner(id);
  }

  @ResolveField()
  async defeats(@Parent() profile: Profile) {
    const { id } = profile;
    return this.matchService.findAllByLoser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Profile, { nullable: true })
  async me(@Context() context) {
    const { req } = context;
    return await this.profileService.uptime(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { name: 'upload_avatar' })
  async uploadAvatar(@Context() context, @Args({ name: 'file', type: () => GraphQLUpload }) {
    createReadStream,
    filename,
  }: any): Promise<boolean> {
    const { req } = context;
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./public/uploads/${req.user.id}${path.parse(filename).ext}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    );
  }

}