import { EmptyLayout } from 'src/layouts';
import { NextPageWithLayout } from 'types';
import { useSession } from 'src/contexts';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CircleNotch } from 'phosphor-react';

const Index: NextPageWithLayout = () => {

  const router = useRouter();
  const { signIn, profile } = useSession();

  useEffect(() => {

    if (profile) {
      router.back();
      return;
    }

  }, [profile]);

  if (profile) {
    return (
      <div className='min-h-screen h-full flex items-center justify-center bg-primary'>
        <div className='rounded-full flex items-center justify-center p-2'>
          <CircleNotch className='animate-spin text-accent' size={54} weight='thin' />
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen h-full flex flex-col justify-center items-center'>

      <div
        className='rounded-xl bg-primary-500 border border-primary-400 px-20 py-10 flex flex-col items-center space-y-24'>

        <div className='flex flex-col items-center space-y-1'>
          <h1 className='font-semibold text-2xl'>
            Welcome to <span className='text-accent'>ft_transcendence</span>
          </h1>
          <p>To get started log in to your intra account</p>
        </div>

        <button onClick={signIn} className='w-full p-2 rounded-lg bg-accent font-medium border border-primary-400'>
          Sign in with 42
        </button>

      </div>

    </div>
  );
};

Index.getLayout = EmptyLayout;
Index.isPublicRoute = true;
export default Index;