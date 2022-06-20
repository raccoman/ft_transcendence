import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {

  constructor(
    private readonly axios: HttpService,
    private readonly jwt: JwtService
  ) { }

  public async signin(code: string, state: string, response: Response): Promise<any> {

    const {
      data: { fortytwo_token },
      status: token_status,
    } = await lastValueFrom(this.axios.post('https://api.intra.42.fr/oauth/token', {
      grant_type: 'authorization_code',
      client_id: process.env.FORTYTWO_CLIENT_ID,
      client_secret: process.env.FORTYTWO_CLIENT_SECRET,
      code: code,
      redirect_uri: process.env.NESTJS_BASE_URL + '/auth/sign-in'
    }));

    if (token_status != 200)
      return 1;

    const { data, status: me_status } = await lastValueFrom(this.axios.get('https://api.intra.42.fr/v2/me', {
      headers: {
        'Authorization': `Bearer ${fortytwo_token}`
      }
    }));

    if (me_status != 200)
      return 1;

    

    const access_token = await this.jwt.signAsync({
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-default-role": "user",
        "x-hasura-user-id": fortytwo_token.id,
      }
    });

    response.cookie(process.env.JWT_COOKIE_NAME, access_token, { httpOnly: true });
    return 0;
  }


}
