import { ReactElement, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FCWithChildren } from 'types';
import { useSession } from 'src/contexts';
import Image from 'next/image';
import { GameChat, Navbar } from 'src/components';

const Layout = (page: ReactElement) => {

  return (

    <div className='h-screen h-full flex flex-col'>

      <Navbar />
      {page}

      <GameChat />
    </div>

  );

};

export default Layout;