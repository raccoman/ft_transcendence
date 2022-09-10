import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ProfileService } from 'src/profile/profile.service';

const extractJWTFromCookie = (request: Request) => {

  if (!request || !request.headers || !request.headers.cookie)
    return null;

  const cookies = request.headers.cookie;
  const matches = cookies.match(process.env.JWT_COOKIE_NAME + '=([^;]+)');
  return matches && matches.length >= 1 ? matches[1] : null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor(
    private readonly profileService: ProfileService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        extractJWTFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {

    const profile = await this.profileService.findUnique(payload.id);
    if (!profile) {
      throw new UnauthorizedException();
    }

    return { id: payload.id, twofa_authenticated: payload.twofa_authenticated };
  }

}