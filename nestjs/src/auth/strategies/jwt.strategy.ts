import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

const extractJWTFromCookie = (request: Request) => {
  if (!request || !request.headers || !request.headers.cookie)
    return null;

  const cookies = request.headers.cookie;
  const matches = cookies.match(process.env.JWT_COOKIE_NAME + '=([^;]+)');
  return matches && matches.length >= 1 ? matches[1] : null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), extractJWTFromCookie]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { id: payload.id };
  }

}