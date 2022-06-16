import { Body, Controller, Get, Post } from '@nestjs/common';
import { HasuraActionsPayload } from 'types';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async login(@Body() payload: HasuraActionsPayload) {
    console.log(JSON.stringify(payload));
    return this.service.login();
  }
}
