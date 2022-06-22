import { createContext, useContext, useEffect, useState } from 'react';
import { FCWithChildren, SessionContextProps } from 'types';
import { customAlphabet, urlAlphabet } from 'nanoid';
import { Profiles } from 'types/hasura';
import axios from 'axios';
import { useLazyQuery, useMutation } from '@apollo/client';
import { profiles_by_pk } from 'src/graphql/queries';
import { update_last_activity_profiles_by_pk } from 'src/graphql/mutations';

const SessionContext = createContext<SessionContextProps>({
  signIn: undefined,
  isLoading: true,
  profile: undefined,
});

export const SessionContextProvider: FCWithChildren = ({ children }) => {

  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profiles | undefined>(undefined);

  const [fetchProfile] = useLazyQuery(profiles_by_pk);
  const [updateLastActivity] = useMutation(update_last_activity_profiles_by_pk);

  const signIn = () => {
    const INTRA_AUTHORIZATION = 'https://api.intra.42.fr/oauth/authorize?' +
      'client_id=' + process.env.NEXT_PUBLIC_INTRA_CLIENT_ID + '&' +
      'redirect_uri=' + process.env.NEXT_PUBLIC_NESTJS_BASE_URL + '/auth/sign-in' + '&' +
      'state=' + customAlphabet(urlAlphabet)() + '&' +
      'response_type=code';

    window.location.replace(INTRA_AUTHORIZATION);
  };

  const getSession = async () => {

    try {
      setLoading(true);

      const {
        data: {
          'https://hasura.io/jwt/claims': {
            'x-hasura-user-id': id,
          },
        },
      } = await axios.get(process.env.NEXT_PUBLIC_NESTJS_BASE_URL + '/auth/me', { withCredentials: true });

      const { data: { profiles_by_pk } } = await fetchProfile({ variables: { id } });
      setProfile(profiles_by_pk);

    } catch (exception) {
      console.error(exception);
      setProfile(undefined);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {

    const last_activity = setInterval(() => {
      updateLastActivity({
        variables: {
          id: profile,
          last_activity: new Date().valueOf(),
        },
      });
    }, 300000);

    return () => {
      clearInterval(last_activity);
    };

  }, [profile]);

  useEffect(() => {

    getSession();

  }, []);

  return (
    <SessionContext.Provider value={{ signIn, isLoading, profile }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);