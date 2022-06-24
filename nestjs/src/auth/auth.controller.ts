import { Controller, Get, HttpStatus, Query, Res} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly service: AuthService,
    private readonly jwt: JwtService,
  ) {
  }

  @Get('sign-in')
  async signin(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res({ passthrough: true }) response: Response,
  ) {

    const { profile, status, error } = await this.service.signin(code, state);

    if (status < -1) {
      return response.status(HttpStatus.BAD_REQUEST).send(error);
    }

    const access_token = await this.jwt.signAsync({
      'id': profile.id,
    });

    return response
      .status(200)
      .cookie(process.env.JWT_COOKIE_NAME, access_token, { httpOnly: true })
      .redirect(
        status == 1 ?
          process.env.NEXTJS_BASE_URL + '/profiles/' + profile.username
          :
          process.env.NEXTJS_BASE_URL + '/',
      );
  }
}
