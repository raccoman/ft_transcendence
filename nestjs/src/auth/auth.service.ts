import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly axios: HttpService,
    private readonly profile: ProfileService,
  ) {
  }

  public async signin(code: string, state: string): Promise<any> {

    try {

      const {
        data: { access_token: intra_token },
        status: token_status,
      } = await lastValueFrom(this.axios.post('https://api.intra.42.fr/oauth/token', {
        grant_type: 'authorization_code',
        client_id: process.env.INTRA_CLIENT_ID,
        client_secret: process.env.INTRA_CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.NESTJS_BASE_URL + '/auth/sign-in',
      }));

      if (token_status != 200)
        throw new Error('Error while fetching: https://api.intra.42.fr/oauth/token');

      const { data, status: me_status } = await lastValueFrom(this.axios.get('https://api.intra.42.fr/v2/me', {
        headers: {
          'Authorization': `Bearer ${intra_token}`,
        },
      }));

      if (me_status != 200)
        throw new Error('Error while fetching: https://api.intra.42.fr/v2/me');

      let profile = await this.profile.findUnique(data.id);
      if (profile != null) {
        return { profile, status: 0 };
      }

      profile = await this.profile.create({
        id: data.id,
        username: data.login,
        email: data.email,
        avatar: data.image_url,
      });
      if (profile == null)
        throw new Error('An error occurred while creating your profile.');

      return { profile, status: 1 };

    } catch (exception: any) {
      console.error(exception);
      return { profile: null, status: -1, error: exception.message };
    }

  }


}
