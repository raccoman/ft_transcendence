import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly service: AuthService) {
  }

  @Get('sign-in')
  async signin(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res({ passthrough: true }) response: Response
  ): Promise<any> {
    return this.service.signin(code, state, response);
  }

}
