import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { gql } from 'graphql-request';
import { InjectHasura } from '../hasura/hasura.module';
import { Profiles, Sdk } from 'types/hasura';
import { utcToZonedTime } from 'date-fns-tz';

gql`
    query profiles_by_pk($id: Int!) {
        profiles_by_pk(id: $id) {
            id
            username
            email
            avatar
            gems
            last_activity
        }
    }

    mutation insert_profiles_one($id: Int!, $username: String!, $email: String!, $avatar: String!) {
        insert_profiles_one(object: {id: $id, username: $username, email: $email, avatar: $avatar}) {
            id
            username
            email
            avatar
            gems
            last_activity
        }
    }

    mutation update_profiles_by_pk($id: Int!, $last_activity: timestamptz!) {
        update_profiles_by_pk(pk_columns: {id: $id}, _set: {last_activity: $last_activity}) {
            id
            username
            email
            avatar
            gems
            last_activity
        }
    }
`;

@Injectable()
export class AuthService {

  constructor(
    private readonly axios: HttpService,
    @InjectHasura() private readonly hasura: Sdk,
  ) {
  }

  public async signin(code: string, state: string): Promise<{ profile: Profiles, status: number, error?: string }> {

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

      const { profiles_by_pk } = await this.hasura.profiles_by_pk({
        id: data.id,
      });

      if (profiles_by_pk != null)
        return { profile: profiles_by_pk, status: 0 };

      const { insert_profiles_one } = await this.hasura.insert_profiles_one({
        id: data.id,
        username: data.login,
        email: data.email,
        avatar: data.image_url,
      });

      if (insert_profiles_one == null)
        throw new Error('Error while fetching: hasura - insert_profiles_one');

      return { profile: insert_profiles_one, status: 1 };

    } catch (exception: any) {
      return { profile: null, status: -1, error: exception.message };
    }

  }

  public async me(id: number): Promise<{ profile: Profiles }> {
    const { update_profiles_by_pk } = await this.hasura.update_profiles_by_pk({
      id,
      last_activity: new Date().toISOString(),
    });
    return { profile: update_profiles_by_pk };
  }

}
