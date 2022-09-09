import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useGame, useSession } from 'src/contexts';
import { useEffect, useRef } from 'react';
import { GameBanner, GameCanvas } from 'src/components';
import { MatchState } from 'types';
import Image from 'next/image';
import Link from 'next/link';

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
    <div className='h-full px-5 py-2 flex flex-col items-center justify-center gap-20'>

      {match.state === MatchState.ENDING && (

        <>

          <div className='flex items-center gap-16'>

            {match.players.map((player, index) => (

              <>

                <div className='flex flex-col justify-center items-center gap-4 w-[300px]'>


                  <div className='flex flex-col justify-center gap-2'>

                    <p className='text-2xl font-medium w-full text-center border border-primary-500 rounded'>
                      {player.profile.username}
                    </p>

                    <div className='border border-primary-500 rounded overflow-hidden w-[192px] h-[192px]'>
                      <img src={player.profile.avatar || '/assets/default-avatar.png'}
                           className='rounded w-full h-full object-cover' alt='avatar' />
                    </div>

                  </div>

                  {player.lives > 0 && (
                    <div className='w-[200px] h-[100px]'>
                      <img src='/assets/match/winner.svg' className='rounded w-full h-full object-cover' alt='winner' />
                    </div>
                  )}

                  {player.lives <= 0 && (
                    <div className='w-[200px] h-[100px]'>
                      <img src='/assets/match/loser.svg' className='rounded w-full h-full object-cover' alt='loser' />
                    </div>
                  )}

                </div>


                {index == 0 && (
                  <Image src='/assets/match/competition.png' width={256} height={256} layout='fixed' />
                )}

              </>
            ))}

          </div>

          <Link href='/'>
            <button className='bg-accent rounded-lg px-20 py-2 font-semibold text-xl'>
              PLAY AGAIN
            </button>
          </Link>

        </>

      )}

      {match.state !== MatchState.ENDING && (

        <div className='flex flex-col gap-4'>

          <GameBanner match={match} />

          <div className='relative border border-primary-400 rounded-lg overflow-hidden'>
            <p className='z-10 absolute right-3 top-2'>{fps} FPS</p>
            <GameCanvas match={match} frameRate={fps} />
          </div>

        </div>

      )}

    </div>
  );
};

export default Game;