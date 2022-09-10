import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ProfileService } from 'src/profile/profile.service';
import { SocialAuthenticationInput, SocialAuthenticationResponse } from 'types';

@Injectable()
export class AuthService {

  private static readonly INTRA_TOKEN_API = 'https://api.intra.42.fr/oauth/token';
  private static readonly INTRA_USER_API = 'https://api.intra.42.fr/v2/me';
  private static readonly INTRA_CALLBACK_URI = process.env.NESTJS_BASE_URL + '/auth/callback/intra';
  private static readonly INTRA_CLIENT_ID = process.env.INTRA_CLIENT_ID;
  private static readonly INTRA_CLIENT_SECRET = process.env.INTRA_CLIENT_SECRET;

  private static readonly GITHUB_TOKEN_API = 'https://github.com/login/oauth/access_token';
  private static readonly GITHUB_USER_API = 'https://api.github.com/user';
  private static readonly GITHUB_CALLBACK_URI = process.env.NESTJS_BASE_URL + '/auth/callback/github';
  private static readonly GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  private static readonly GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

  constructor(
    private readonly axios: HttpService,
    private readonly profile: ProfileService,
  ) {
  }

  public async intra({ code }: SocialAuthenticationInput): Promise<SocialAuthenticationResponse> {

    const {
      data: { access_token },
      status: token_status,
    } = await lastValueFrom(this.axios.post(AuthService.INTRA_TOKEN_API, {
      grant_type: 'authorization_code',
      client_id: AuthService.INTRA_CLIENT_ID,
      client_secret: AuthService.INTRA_CLIENT_SECRET,
      code: code,
      redirect_uri: AuthService.INTRA_CALLBACK_URI,
    }));

    if (token_status != HttpStatus.OK) {
      return {
        profile: null,
        created: false,
        exception: 'Request (url=' + AuthService.INTRA_TOKEN_API + ') has failed (status=' + token_status + ').',
      };
    }

    const { data, status: user_status } = await lastValueFrom(this.axios.get(AuthService.INTRA_USER_API, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    }));

    if (user_status != HttpStatus.OK) {
      return {
        profile: null,
        created: false,
        exception: 'Request (url=' + AuthService.INTRA_USER_API + ') has failed (status=' + user_status + ').',
      };
    }

    let profile = await this.profile.findUnique(data.id);
    if (profile != null) {
      return { profile, created: false };
    }

    profile = await this.profile.create({
      id: data.id,
      username: data.login,
      email: data.email,
      avatar: data.image_url,
    });
    if (!profile) {
      return {
        profile: null,
        created: false,
        exception: 'Profile creation on database has failed.',
      };
    }

    return { profile, created: true };
  }

  public async github({ code }: SocialAuthenticationInput): Promise<SocialAuthenticationResponse> {

    const {
      data: { access_token },
      status: token_status,
    } = await lastValueFrom(this.axios.post(AuthService.GITHUB_TOKEN_API, {
      client_id: AuthService.GITHUB_CLIENT_ID,
      client_secret: AuthService.GITHUB_CLIENT_SECRET,
      code: code,
      redirect_uri: AuthService.GITHUB_CALLBACK_URI,
    }, {
      headers: {
        'Accept': 'application/json',
      },
    }));

    if (token_status != HttpStatus.OK) {
      return {
        profile: null,
        created: false,
        exception: 'Request (url=' + AuthService.GITHUB_TOKEN_API + ') has failed (status=' + token_status + ').',
      };
    }

    const { data, status: user_status } = await lastValueFrom(this.axios.get(AuthService.GITHUB_USER_API, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    }));

    if (user_status != HttpStatus.OK) {
      return {
        profile: null,
        created: false,
        exception: 'Request (url=' + AuthService.GITHUB_USER_API + ') has failed (status=' + user_status + ').',
      };
    }

    let profile = await this.profile.findUnique(data.id);
    if (profile != null) {
      return { profile, created: false };
    }

    profile = await this.profile.create({
      id: data.id,
      username: data.login,
      email: data.email,
      avatar: data.avatar_url,
    });
    if (!profile) {
      return {
        profile: null,
        created: false,
        exception: 'Profile creation on database has failed.',
      };
    }

    return { profile, created: true };
  }

}
