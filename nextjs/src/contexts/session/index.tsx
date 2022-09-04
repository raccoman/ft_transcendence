import { createContext, useContext, useEffect } from 'react';
import { FCWithChildren, SessionContextProps } from 'types';
import { customAlphabet, urlAlphabet } from 'nanoid';
import { useQuery } from '@apollo/client';
import { ME } from 'graphql/queries';
import { Simulate } from 'react-dom/test-utils';

const SessionContext = createContext<SessionContextProps>({
  signIn: undefined,
  isLoading: true,
  profile: undefined,
});

export const SessionContextProvider: FCWithChildren = ({ children }) => {

  const { loading, data } = useQuery(ME, {
    pollInterval: 300000,
  });

  const signIn = () => {
    const INTRA_AUTHORIZATION = 'https://api.intra.42.fr/oauth/authorize?' +
      'client_id=' + process.env.NEXT_PUBLIC_INTRA_CLIENT_ID + '&' +
      'redirect_uri=' + process.env.NEXT_PUBLIC_REDIRECT_URI + '&' +
      'state=' + customAlphabet(urlAlphabet)() + '&' +
      'response_type=code';

    window.location.replace(INTRA_AUTHORIZATION);
  };

  return (
    <SessionContext.Provider value={{
      signIn,
      isLoading: loading && !data,
      profile: data && data.me,
    }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);