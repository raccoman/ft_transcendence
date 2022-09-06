import { Injectable } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';
import { authenticator } from 'otplib';

@Injectable()
export class TwoFactorAuthService {

  constructor(
    private readonly profileService: ProfileService,
  ) {
  }

  public async generateSecret(id: number) {

    const secret = authenticator.generateSecret();

    await this.profileService.update(id, {
      twofa_secret: secret,
    });

    const otpauthUrl = authenticator.keyuri(id.toString(), process.env.TWO_FACTOR_AUTH_APP_NAME, secret);
    return { secret, otpauthUrl };
  }

  public async getSecret(id: number) {

    const { twofa_secret: secret } = await this.profileService.findUnique(id);
    if (!secret) {
      return this.generateSecret(id);
    }

    const otpauthUrl = authenticator.keyuri(id.toString(), process.env.TWO_FACTOR_AUTH_APP_NAME, secret);
    return { secret, otpauthUrl };
  }

  public verify(token: string, secret: string) {
    return authenticator.verify({ token, secret });
  }


}
