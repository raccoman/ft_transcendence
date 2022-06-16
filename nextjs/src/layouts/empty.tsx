import { ReactElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = (page: ReactElement) => (
    <>
        {page}
    </>
);

export default Layout;