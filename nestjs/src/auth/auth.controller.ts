import { Controller, Get, HttpStatus, Query, Req, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

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


  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() request, @Res() response: Response): Promise<any> {

    try {
      const profile = await this.service.me(request.user['https://hasura.io/jwt/claims']['x-hasura-user-id']);

      return response
        .status(200)
        .send(profile);

    } catch (exception) {
      console.error(exception);
      return response.status(404).send('An error occurred while retrieving your session.');
    }
  }

}
