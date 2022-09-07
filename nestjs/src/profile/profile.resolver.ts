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

@ObjectType()
export class MeResponse extends Profile {
  @Field()
  twofa_authenticated: boolean;
}

@Resolver(of => Profile)
export class ProfileResolver {

  constructor(
    private readonly profileService: ProfileService,
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
  @Mutation(() => Boolean, { name: 'upload_avatar' })
  async uploadAvatar(@Context() context, @Args({ name: 'file', type: () => GraphQLUpload }) {
    createReadStream,
    filename,
  }: any): Promise<boolean> {

    const { req } = context;
    const dest = req.user.id + path.parse(filename).ext;

    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${dest}`))
        .on('finish', async () => {
          try {
            await this.profileService.update(req.user.id, { avatar: process.env.NESTJS_BASE_URL + '/profile/avatar/' + dest });
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

}