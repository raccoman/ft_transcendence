import { Args, Context, Field, Mutation, ObjectType, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Profile } from 'src/profile/models/profile.model';
import { ProfileService } from 'src/profile/profile.service';
import { UseGuards } from '@nestjs/common';
import { Jwt2FAGuard } from 'src/auth/guards/jwt-2fa.guard';
import { MatchService } from 'src/game/services/match.service';
import { createWriteStream } from 'fs';
import * as path from 'path';

import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { TwoFactorAuthService } from 'src/auth/services/2fa.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GraphQLInt, GraphQLString } from 'graphql/type';
import { BackgroundService } from 'src/assets/services/background.service';

@ObjectType()
export class MeResponse extends Profile {
  @Field()
  twofa_authenticated: boolean;
}

@Resolver(of => Profile)
export class ProfileResolver {

  constructor(
    private readonly profileService: ProfileService,
    private readonly backgroundService: BackgroundService,
    private readonly matchService: MatchService,
    private readonly twoFactorAuthService: TwoFactorAuthService,
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

  @ResolveField()
  async backgrounds(@Parent() profile: Profile) {
    const { id } = profile;
    return this.backgroundService.findAllByOwner(id);
  }


  @UseGuards(JwtAuthGuard)
  @Query(() => MeResponse, { nullable: true })
  async me(@Context() context) {
    const { req } = context;

    const profile = await this.profileService.update(req.user.id, { updated_at: new Date() });
    if (!profile) {
      return null;
    }

    return { ...profile, twofa_authenticated: req.user.twofa_authenticated };
  }

  @UseGuards(Jwt2FAGuard)
  @Query(() => Profile, { name: 'find_profile', nullable: true })
  async findProfile(@Context() context, @Args({ name: 'id', type: () => GraphQLInt }) id) {
    return await this.profileService.findUnique(id, false);
  }

  @UseGuards(Jwt2FAGuard)
  @Mutation(() => Boolean, { name: 'upload_avatar' })
  async uploadAvatar(@Context() context, @Args({ name: 'file', type: () => GraphQLUpload }) {
    createReadStream,
    filename,
  }: any): Promise<boolean> {

    const { req } = context;
    const dest = req.user.id + path.parse(filename).ext;

    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/avatars/${dest}`))
        .on('finish', async () => {
          try {
            await this.profileService.update(req.user.id, { avatar: process.env.NESTJS_BASE_URL + '/assets/avatar/' + dest });
            return resolve(true);
          } catch (exception) {
            return resolve(false);
          }
        })
        .on('error', () => resolve(false)),
    );
  }


  @UseGuards(Jwt2FAGuard)
  @Mutation(() => Boolean, { name: 'twofa_refresh_secret' })
  async twoFactorRefreshSecret(@Context() context) {
    const { req } = context;
    return new Promise(async (resolve, reject) => {
      const data = await this.twoFactorAuthService.generateSecret(req.user.id);
      return resolve(!!data);
    });
  }

  @UseGuards(Jwt2FAGuard)
  @Mutation(() => Boolean, { name: 'equip_background' })
  async equipBackground(@Context() context, @Args({ name: 'id', type: () => GraphQLString, nullable: true }) id) {

    const { req } = context;

    const profile = await this.profileService.findUnique(req.user.id, false);
    if (!profile) {
      return false;
    }

    const index = profile.backgrounds.findIndex(x => x.id == id);
    const snapshot = await this.profileService.update(req.user.id, {
      active_bg: index,
    });

    return snapshot != null;
  }

}