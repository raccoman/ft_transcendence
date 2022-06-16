import '../tailwind.css';
import type { AppProps } from 'next/app';
import { AppPropsWithLayout } from 'types';

import { DefaultLayout } from 'src/layouts';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? DefaultLayout;
  
  return (
    <>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp
