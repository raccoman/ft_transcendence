import { EmptyLayout } from 'src/layouts';
import { NextPageWithLayout } from 'types';
import { useSession } from 'src/contexts';
import { useRouter } from 'next/router';
import { CircleNotch } from 'phosphor-react';
import Image from 'next/image';

const Index: NextPageWithLayout = () => {

  const router = useRouter();
  const { ft_signIn, github_signIn, profile } = useSession();

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
        className='rounded bg-primary-500 border border-primary-400 px-20 py-10 flex flex-col items-center space-y-16'>

        <div className='flex flex-col items-center space-y-1'>
          <h1 className='font-semibold text-2xl'>
            Welcome to <span className='text-accent'>ft_transcendence</span>
          </h1>
          <p>To get started log in to your account</p>
        </div>

        <div className='flex flex-col space-y-2 w-full'>

          <button onClick={ft_signIn}
                  className='border border-primary-400 rounded flex items-center py-2 px-5 space-x-5 bg-[#00babc] text-black font-medium'>
            <Image src='/assets/oauth/ft.png' width={24} height={24} alt='' />
            <p>Sign in with Intra</p>
          </button>

          <button onClick={github_signIn}
                  className='border border-primary-400 rounded flex items-center py-2 px-5 space-x-5 bg-[#171515] font-medium'>
            <Image src='/assets/oauth/github.svg' width={24} height={24} className='text-white' alt='' />
            <p>Sign in with Github</p>
          </button>

        </div>

      </div>

    </div>
  );
};

Index.getLayout = EmptyLayout;
Index.isPublicRoute = true;
export default Index;