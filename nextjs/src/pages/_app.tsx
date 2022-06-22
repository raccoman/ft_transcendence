import '../tailwind.css';
import { AppPropsWithLayout } from 'types';

import { DefaultLayout } from 'src/layouts';
import { APOLLO_CLIENT, AppContextProvider, SessionContextProvider } from 'src/contexts';
import { AuthGuard } from 'src/components';
import { ApolloProvider } from '@apollo/client';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? DefaultLayout;
  const isPublicRoute = Component.isPublicRoute ?? false;

  return (
    <>
      <ApolloProvider client={APOLLO_CLIENT}>
        <SessionContextProvider>
          <AuthGuard isPublic={isPublicRoute}>

            <AppContextProvider>

              {getLayout(<Component {...pageProps} />)}

            </AppContextProvider>

          </AuthGuard>
        </SessionContextProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
