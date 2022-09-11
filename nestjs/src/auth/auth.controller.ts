import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Jwt2FAGuard } from 'src/auth/guards/jwt-2fa.guard';
import { TwoFactorAuthService } from 'src/auth/services/2fa.service';
import { toFileStream } from 'qrcode';
import { ProfileService } from 'src/profile/profile.service';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService,
    private readonly twoFactorAuthService: TwoFactorAuthService,
    private readonly jwtService: JwtService,
  ) {
  }

  @Get('callback/github')
  async callback_github(
    @Query('code') code: string,
    @Res({ passthrough: true }) response: Response,
  ) {

    const { profile, created, exception } = await this.authService.github({ code });
    if (exception) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(exception);
      return;
    }

    const access_token = await this.jwtService.signAsync({
      'id': profile.id,
      'twofa_enabled': profile.twofa_enabled,
      'twofa_authenticated': false,
    });

    return response
      .status(200)
      .cookie(process.env.JWT_COOKIE_NAME, access_token, { httpOnly: true })
      .redirect(
        created ?
          process.env.NEXTJS_BASE_URL + '/profile/' + profile.id
          :
          process.env.NEXTJS_BASE_URL + '/',
      );

  }

  @Get('callback/intra')
  async callback_intra(
    @Query('code') code: string,
    @Res({ passthrough: true }) response: Response,
  ) {

    const { profile, created, exception } = await this.authService.intra({ code });
    if (exception) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(exception);
      return;
    }

    const access_token = await this.jwtService.signAsync({
      'id': profile.id,
      'twofa_enabled': profile.twofa_enabled,
      'twofa_authenticated': false,
    });

    return response
      .status(200)
      .cookie(process.env.JWT_COOKIE_NAME, access_token, { httpOnly: true })
      .redirect(
        created ?
          process.env.NEXTJS_BASE_URL + '/profile/' + profile.id
          :
          process.env.NEXTJS_BASE_URL + '/',
      );

  }

  @Get('2fa-qrcode')
  @UseGuards(Jwt2FAGuard)
  async twoFactorQRCode(@Req() request, @Res() response: Response) {
    const { user } = request;
    const { otpauthUrl } = await this.twoFactorAuthService.getSecret(user.id);
    return toFileStream(response, otpauthUrl);
  }

}
