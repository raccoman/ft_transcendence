import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'src/contexts';
import { Heartbeat, HeartBreak } from 'phosphor-react';
import { KeyboardEventHandler, useEffect, useState } from 'react';

const PongCanvas = dynamic(() => import('src/components/game'), { ssr: false });

const Game: NextPage = () => {

  const router = useRouter();
  const { id } = router.query;

  const { profile } = useSession();

  const [me, setMe] = useState({ profile: { username: 'raccoman' }, posY: 10, lives: 2 });
  const [oppenent, setOppenent] = useState({ profile: { username: 'ntropea' }, posY: 20, lives: 4 });

  const lapsed_time = '08:32';

  const onKeyDown = (e: KeyboardEvent) => {

    if (e.key === 'ArrowUp')
      setMe({ ...me, posY: me.posY - 3 });

    if (e.key === 'ArrowDown')
      setMe({ ...me, posY: me.posY + 3 });

  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div className='h-full px-5 py-2 flex flex-col items-center justify-center'>

      <div className='flex flex-col space-y-4'>

        <div className='flex items-center justify-center py-2.5 px-10 space-x-10 border border-primary-400 rounded-lg'>

          <p className='text-xl font-medium w-[150px] text-center'>{me.profile.username}</p>
          <div className='flex items-center space-x-2'>
            {Array.from(Array(me.lives).keys()).map((value, index) => (
              <Heartbeat key={index} className='text-red-600' weight='duotone' size={32} />
            ))}
            {Array.from(Array(5 - me.lives).keys()).map((value, index) => (
              <HeartBreak key={index} className='text-primary-400' weight='duotone' size={32} />
            ))}
          </div>

          <div className='py-2 px-4 border border-primary-400 rounded-md'>
            <p className='text-xl font-medium'>{lapsed_time}</p>
          </div>

          <div className='flex items-center space-x-2'>
            {Array.from(Array(5 - oppenent.lives).keys()).map((value, index) => (
              <HeartBreak key={index} className='text-primary-400' weight='duotone' size={32} />
            ))}
            {Array.from(Array(oppenent.lives).keys()).map((value, index) => (
              <Heartbeat key={index} className='text-red-600' weight='duotone' size={32} />
            ))}
          </div>
          <p className='text-xl font-medium w-[150px] text-center'>{oppenent.profile.username}</p>

        </div>

        <div className='border border-primary-400 rounded-lg overflow-hidden'>
          <PongCanvas posY={me.posY} oPosY={oppenent.posY} />
        </div>

      </div>

    </div>
  );
};

export default Game;