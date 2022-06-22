import { FCWithChildren } from 'types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'src/contexts';

const Component: FCWithChildren = ({ children }) => {

  const { profile } = useSession();

  return (

    <div className='flex items-center justify-center p-5 space-x-2'>


      <Link href='/profile' passHref>

        <div className='flex items-center'>

          <div className='border-2 border-accent rounded-lg overflow-hidden'>
            <img src={profile?.avatar || '/assets/default-avatar.png'} className='w-[48px] h-[48px] object-cover'
                 alt='avatar' />
          </div>

          <div className='flex items-center border border-primary-400 py-1.5 px-5 space-x-5 hover:bg-primary-500'>

            <p>{profile?.username}#{profile?.id}</p>

            <div className='bg-primary-400 h-[24px] w-[1px]' />

            <div className='flex items-center space-x-2'>
              <p className='font-medium'>{profile?.gems}</p>
              <img src='/assets/gem.svg' className='w-[24px] h-[24px]' alt='profile-gems' />
            </div>

          </div>

        </div>
      </Link>

      <div className='flex items-center border border-primary-400 py-1.5 px-5 space-x-5 hover:bg-primary-500'>
        <img src='/assets/trophy.svg' className='w-[24px] h-[24px]' alt='top-100' />
        <p className='font-medium'>Top 100</p>
      </div>

      <div className='flex items-center border border-primary-400 bg-accent rounded-br-md rounded-tr-md py-1.5 px-5 space-x-5 hover:bg-accent/80'>
        <img src='/assets/shop.svg' className='w-[24px] h-[24px]' alt='top-100' />
        <p className='font-medium'>Store</p>
      </div>

    </div>

  );

};

export default Component;