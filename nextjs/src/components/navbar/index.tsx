import { FCWithChildren } from 'types';
import Link from 'next/link';
import { useSession } from 'src/contexts';

const Component: FCWithChildren = ({ children }) => {

  const { profile } = useSession();

  return (

    <div className='flex items-center justify-center p-5 space-x-2'>


      <Link href={'/profile/' + profile?.id} passHref>

        <div className='flex items-center'>

          <div className='border border-accent rounded w-[48px] h-[48px]'>
            <img src={profile?.avatar || '/assets/default-avatar.png'} className='w-full h-full object-cover rounded' alt='avatar' />
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

      <Link href='/'>
        <div className='flex items-center border border-primary-400 py-1.5 px-5 space-x-5 hover:bg-primary-500'>
          <img src='/assets/game.svg' className='w-[24px] h-[24px]' alt='top-100' />
          <p className='font-medium'>Play</p>
        </div>
      </Link>

      <Link href='/leaderboard'>
        <div className='flex items-center border border-primary-400 py-1.5 px-5 space-x-5 hover:bg-primary-500'>
          <img src='/assets/trophy.svg' className='w-[24px] h-[24px]' alt='top-100' />
          <p className='font-medium'>Top 100</p>
        </div>
      </Link>

      <Link href='/store'>
        <div className='flex items-center border border-primary-400 bg-accent rounded-br-md rounded-tr-md py-1.5 px-5 space-x-5 hover:bg-accent/80'>
          <img src='/assets/shop.svg' className='w-[24px] h-[24px]' alt='top-100' />
          <p className='font-medium'>Store</p>
        </div>
      </Link>

    </div>

  );

};

export default Component;