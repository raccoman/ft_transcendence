import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ProfileService } from 'src/profile/profile.service';
import { UseGuards } from '@nestjs/common';
import { Jwt2FAGuard } from 'src/auth/guards/jwt-2fa.guard';
import { TwoFactorAuthService } from 'src/auth/services/2fa.service';
import { JwtService } from '@nestjs/jwt';
import { GraphQLString } from 'graphql/type';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Resolver()
export class TwoFactorAuthResolver {

  constructor(
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService,
    private readonly twoFactorAuthService: TwoFactorAuthService,
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { name: 'twofa_authenticate' })
  async twoFactorAuthenticate(@Context() context, @Args({ name: 'token', type: () => GraphQLString }) token) {
    const { req: { user, res } } = context;

    const profile = await this.profileService.findUnique(user.id);
    if (!profile || !profile.twofa_enabled || !profile.twofa_secret) {
      return false;
    }

    const valid = this.twoFactorAuthService.verify(token, profile.twofa_secret);
    if (!valid) {
      return false;
    }

    const access_token = await this.jwtService.signAsync({
      'id': user.id,
      'twofa_enabled': user.twofa_enabled,
      'twofa_authenticated': true,
    });

    res.cookie(process.env.JWT_COOKIE_NAME, access_token, { httpOnly: true });
    return true;
  }

  @UseGuards(Jwt2FAGuard)
  @Mutation(() => Boolean, { name: 'twofa_refresh_secret' })
  async twoFactorRefreshSecret(@Context() context) {
    const { req: { user } } = context;

    const data = await this.twoFactorAuthService.generateSecret(user.id);
    return !!data;
  }

  @UseGuards(Jwt2FAGuard)
  @Mutation(() => Boolean, { name: 'twofa_enable' })
  async twoFactorAuthEnable(@Context() context) {
    const { req: { user } } = context;
    const data = await this.profileService.update(user.id, { twofa_enabled: true });
    return !!data;
  }

  @UseGuards(Jwt2FAGuard)
  @Mutation(() => Boolean, { name: 'twofa_disable' })
  async twoFactorAuthDisable(@Context() context) {
    const { req: { user } } = context;
    const data = await this.profileService.update(user.id, { twofa_enabled: false });
    return !!data;
  }

}