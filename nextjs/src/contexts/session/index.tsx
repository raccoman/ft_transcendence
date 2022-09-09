import { ChangeEventHandler, createContext, useContext, useEffect } from 'react';
import { FCWithChildren, SessionContextProps } from 'types';
import { customAlphabet, urlAlphabet } from 'nanoid';
import { useMutation, useQuery } from '@apollo/client';
import { ME } from 'graphql/queries';
import {
  EQUIP_BACKGROUND,
  TWOFA_AUTHENTICATE,
  TWOFA_DISABLE,
  TWOFA_ENABLE,
  TWOFA_REFRESH_SECRET,
  UPLOAD_AVATAR,
} from 'graphql/mutations';

const SessionContext = createContext<SessionContextProps>({
  signIn: undefined,
  isLoading: true,
  profile: undefined,
  uploadAvatar: undefined,
  equipBackground: undefined,
  twoFactorAuth: {
    refreshSecret: undefined,
    disable: undefined,
    enable: undefined,
    authenticate: undefined,
  },
});

export const SessionContextProvider: FCWithChildren = ({ children }) => {

  const { loading, data, refetch } = useQuery(ME);
  const [upload] = useMutation(UPLOAD_AVATAR);
  const [equipBackground] = useMutation(EQUIP_BACKGROUND);

  const [TFA_refreshSecret] = useMutation(TWOFA_REFRESH_SECRET);
  const [TFA_authenticate] = useMutation(TWOFA_AUTHENTICATE);
  const [TFA_enable] = useMutation(TWOFA_ENABLE);
  const [TFA_disable] = useMutation(TWOFA_DISABLE);

  const signIn = () => {
    const INTRA_AUTHORIZATION = 'https://api.intra.42.fr/oauth/authorize?' +
      'client_id=' + process.env.NEXT_PUBLIC_INTRA_CLIENT_ID + '&' +
      'redirect_uri=' + process.env.NEXT_PUBLIC_REDIRECT_URI + '&' +
      'state=' + customAlphabet(urlAlphabet)() + '&' +
      'response_type=code';

    window.location.replace(INTRA_AUTHORIZATION);
  };

  const uploadAvatar: ChangeEventHandler<HTMLInputElement> = async ({ target: { validity, files } }) => {
    try {

      if (!validity.valid || !files || files.length < 1)
        return;

      await upload({ variables: { file: files[0] } });
      await refetch();
    } catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    const interval = setInterval(refetch, 300000);
    return () => {
      clearInterval(interval);
    };
  }, [refetch]);

  return (
    <SessionContext.Provider value={{
      signIn,
      isLoading: loading && !data,
      profile: data && data.me,
      uploadAvatar,
      equipBackground: (id: string | undefined) => equipBackground({ variables: { id } }).then(refetch),
      twoFactorAuth: {
        refreshSecret: () => TFA_refreshSecret().then(refetch),
        authenticate: (data: any) => TFA_authenticate(data),
        enable: () => TFA_enable().then(refetch),
        disable: () => TFA_disable().then(refetch),
      },
    }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);