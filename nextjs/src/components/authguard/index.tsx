import { FCWithChildren } from 'types';
import { useRouter } from 'next/router';
import { useSession } from 'src/contexts';
import { useEffect, useState } from 'react';
import { CircleNotch } from 'phosphor-react';

const Component: FCWithChildren<{ isPublic: boolean }> = ({ children, isPublic }) => {

  const router = useRouter();
  const { isLoading, profile } = useSession();

  useEffect(() => {

    if (isLoading || isPublic)
      return;

    if (!profile) {
      router.push('/auth');
      return;
    }

    if (profile.twofa_enabled && !profile.twofa_authenticated) {
      router.push('/auth/2fa');
      return;
    }

  }, [isLoading, isPublic, profile, router]);

  if (isLoading || (!isPublic && !profile) ||
    (profile && profile.twofa_enabled && !profile.twofa_authenticated
    && !router.pathname.includes('/auth/2fa'))) {

    return (
      <div className='min-h-screen h-full flex items-center justify-center bg-primary'>
        <div className='rounded-full flex items-center justify-center p-2'>
          <CircleNotch className='animate-spin text-accent' size={54} weight='thin' />
        </div>
      </div>
    );

  }

  return (<>{children}</>);
};

export default Component;