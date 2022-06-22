import { Controller, Get, HttpStatus, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
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
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': String(profile.id),
      },
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


  @Get('me')
  async me(@Req() request: Request, @Res() response: Response): Promise<any> {

    try {

      const cookie = request.cookies[process.env.JWT_COOKIE_NAME];
      const data = await this.jwt.verifyAsync(cookie);

      return response.status(HttpStatus.OK).send(data);

    } catch (excpetion) {
      return response.status(HttpStatus.OK).send(null);
    }
  }

}
