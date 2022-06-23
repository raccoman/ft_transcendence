import { createContext, useContext, useEffect, useState } from 'react';
import { FCWithChildren, SessionContextProps } from 'types';
import { customAlphabet, urlAlphabet } from 'nanoid';
import { Profiles } from 'types/hasura';
import axios from 'axios';

const SessionContext = createContext<SessionContextProps>({
  signIn: undefined,
  isLoading: true,
  profile: undefined,
});

export const SessionContextProvider: FCWithChildren = ({ children }) => {

  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profiles | undefined>(undefined);

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

      const { data: { profile } } = await axios.get(process.env.NEXT_PUBLIC_NESTJS_BASE_URL + '/auth/me', { withCredentials: true });

      setProfile(profile);

    } catch (exception) {
      console.error(exception);
      setProfile(undefined);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {

    getSession();

    const session = setInterval(() => {

      getSession();

    }, 300000);

    return () => {
      clearInterval(session);
    };

  }, []);

  return (
    <SessionContext.Provider value={{ signIn, isLoading, profile }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);