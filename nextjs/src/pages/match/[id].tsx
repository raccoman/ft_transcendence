import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'src/contexts';
import { Heartbeat, HeartBreak } from 'phosphor-react';

const PongCanvas = dynamic(() => import('src/components/game'), { ssr: false });

const Game: NextPage = () => {

  const router = useRouter();
  const { id } = router.query;

  const { profile } = useSession();

  const me = { profile: { username: 'raccoman' }, lives: 2 };
  const oppenent = { profile: { username: 'ntropea' }, lives: 1 };
  const lapsed_time = '08:32';

  return (
    <div className='h-full px-5 py-2 flex flex-col items-center justify-center'>

      <div className='border border-primary-400 rounded-lg overflow-hidden'>

        <div className='flex items-center justify-center py-2.5 px-10 space-x-10'>
          <p className='text-xl font-medium'>{me.profile.username}</p>
          <div className='flex items-center space-x-2'>
            {Array.from(Array(me.lives).keys()).map(() => (
              <Heartbeat className='text-red-600' weight='duotone' size={32} />
            ))}
            {Array.from(Array(5 - me.lives).keys()).map(() => (
              <HeartBreak className='text-primary-400' weight='duotone' size={32} />
            ))}
          </div>

          <div className='py-2 px-4 border border-primary-400 rounded-md'>
            <p className='text-xl font-medium'>{lapsed_time}</p>
          </div>

          <div className='flex items-center space-x-2'>
            {Array.from(Array(5 - oppenent.lives).keys()).map(() => (
              <HeartBreak className='text-primary-400' weight='duotone' size={32} />
            ))}
            {Array.from(Array(oppenent.lives).keys()).map(() => (
              <Heartbeat className='text-red-600' weight='duotone' size={32} />
            ))}
          </div>
          <p className='text-xl font-medium'>{oppenent.profile.username}</p>
        </div>

        <PongCanvas />

      </div>

    </div>
  );
};

export default Game;