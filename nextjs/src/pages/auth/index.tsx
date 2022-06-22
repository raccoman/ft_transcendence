import { EmptyLayout } from 'src/layouts';
import { NextPageWithLayout } from 'types';
import { useSession } from 'src/contexts';

const Index: NextPageWithLayout = () => {

  const { signIn } = useSession();

  return (
    <div className='min-h-screen h-full flex flex-col justify-center items-center'>

      <div className='rounded-xl bg-primary-500 border border-primary-400 px-20 py-10 flex flex-col items-center space-y-24'>

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