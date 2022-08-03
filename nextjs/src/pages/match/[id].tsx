import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useGame, useSession } from 'src/contexts';
import { Eye, Heartbeat, HeartBreak } from 'phosphor-react';
import { useEffect, useRef } from 'react';
import { toMMSS } from 'src/utils/timestamp';

const PongCanvas = dynamic(() => import('src/components/game'), { ssr: false });

const Game: NextPage = () => {

  const router = useRouter();
  const { id } = router.query;

  const requestRef = useRef<number | undefined>();
  const previousTimeRef = useRef<number | undefined>();

  const { profile } = useSession();
  const { match, onKeyUp, onKeyDown, runTick, fps } = useGame();

  const render = (ms: number) => {

    if (previousTimeRef.current != undefined) {
      runTick(ms - previousTimeRef.current);
    }

    previousTimeRef.current = ms;
    requestRef.current = requestAnimationFrame(render);
  };

  useEffect(() => {

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    requestRef.current = requestAnimationFrame(render);

    return () => {

      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  if (!match || match.id != id) {
    return (
      <div className='h-full px-5 py-2 flex items-center justify-center'>

        <div className='flex divide-x space-x-5'>
          <h1 className='text-accent font-bold text-5xl'>404</h1>
          <div className='flex flex-col pl-5 space-y-2'>
            <h1 className='font-bold text-5xl'>Match Not Found</h1>
            <p className='text-md text-gray-500'>Please check the URL in the address bar and try again.</p>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className='h-full px-5 py-2 flex flex-col items-center justify-center'>

      <div className='flex flex-col space-y-4'>

        <div className='flex items-center justify-center py-2.5 px-10 space-x-10 border border-primary-400 rounded-lg'>

          <p className='text-xl font-medium w-[150px] text-center'>{match.players[0].profile.username}</p>
          <div className='flex items-center space-x-2'>
            {Array.from(Array(match.players[0].lives).keys()).map((value, index) => (
              <Heartbeat key={index} className='text-red-600' weight='duotone' size={32} />
            ))}
            {Array.from(Array(match.settings.lives - match.players[0].lives).keys()).map((value, index) => (
              <HeartBreak key={index} className='text-primary-400' weight='duotone' size={32} />
            ))}
          </div>

          <div className='py-2 px-4 border border-primary-400 rounded-md'>
            <p className='text-xl font-medium font-mono'>{toMMSS(match.timings.elapsed)}</p>
          </div>

          <div className='flex items-center space-x-2'>
            {Array.from(Array(match.settings.lives - match.players[1].lives).keys()).map((value, index) => (
              <HeartBreak key={index} className='text-primary-400' weight='duotone' size={32} />
            ))}
            {Array.from(Array(match.players[1].lives).keys()).map((value, index) => (
              <Heartbeat key={index} className='text-red-600' weight='duotone' size={32} />
            ))}
          </div>
          <p className='text-xl font-medium w-[150px] text-center'>{match.players[1].profile.username}</p>

        </div>

        <div className='relative border border-primary-400 rounded-lg overflow-hidden'>
          <p className='z-10 absolute right-3 top-2 text-gray-500'>{fps} FPS</p>
          <PongCanvas match={match} frameRate={fps} />
        </div>

      </div>

    </div>
  );
};

export default Game;