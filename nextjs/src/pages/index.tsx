import type { NextPage } from 'next';
import Image from 'next/image';
import { useGame, useSession } from 'src/contexts';
import { getCurrentRank, getNextRank, getPrevRank, getRankProgress, getRankRP } from 'src/utils/ranks';
import { MatchType } from 'types';
import { InQueueDialog } from 'src/components/game/dialogs';

const Home: NextPage = () => {

  const { profile } = useSession();
  const { queued, joinQueue, leaveQueue } = useGame();

  return (
    <>

      <InQueueDialog isOpen={queued} onClose={leaveQueue} />

      <div className='px-5 py-20 flex justify-center'>

        <div className='grid grid-cols-2 gap-10'>

          <div className='border border-primary-400 rounded flex flex-col items-center overflow-hidden shadow-lg'>

            <p className='text-xl font-medium bg-primary-400 w-full p-2 text-center'>
              Draft 1vs1
            </p>

            <div className='flex flex-col justify-between w-full h-full space-y-10 p-5'>

              <div className='flex flex-col space-y-10 items-center'>

                <Image src='/assets/ranks/0.svg' width={128} height={128} alt='unranked-match' />

                <p className='font-light text-xs text-center'>
                  It features all the rules, gameplay changes<br />
                  as the Ranked match but does not affect<br />
                  the player&apos;s statistics.
                </p>

              </div>

              <button className='w-full py-1.5 bg-accent rounded font-medium text-sm'
                      onClick={() => joinQueue(MatchType.DRAFT_1vs1)}>
                Join queue
              </button>

            </div>

          </div>

          <div className='border border-primary-400 rounded flex flex-col items-center overflow-hidden shadow-lg'>

            <p className='text-xl font-medium bg-primary-400 w-full p-2 text-center'>
              Ranked 1vs1
            </p>

            <div className='flex flex-col justify-between w-full h-full space-y-10 p-5'>

              <div className='flex flex-col items-center justify-center space-y-5'>

                <div className='w-full flex items-end space-x-2'>
                  <Image src={`/assets/ranks/${getPrevRank(profile!!.rp)}.svg`} width={64} height={64}
                         alt='prev-rank' />
                  <Image src={`/assets/ranks/${getCurrentRank(profile!!.rp)}.svg`} width={128} height={128}
                         alt='current-rank' />
                  <Image src={`/assets/ranks/${getNextRank(profile!!.rp)}.svg`} width={64} height={64}
                         alt='next-rank' />
                </div>

                <div className='w-full grid grid-cols-4 gap-2 items-center'>
                  <div className='w-full flex items-center space-x-2'>
                    <div className='w-full h-[2px] w-full rounded-l-full' style={{
                      background: 'repeating-linear-gradient(to right, #4cc38a 0, #4cc38a 3px, transparent 3px, transparent 7px)',
                    }} />
                    <p className='text-xs'>{getRankRP(getCurrentRank(profile!!.rp))}</p>
                  </div>

                  <div className='col-span-2 bg-primary-400 h-[2px] w-full'>
                    <div className='bg-accent h-full' style={{ width: getRankProgress(profile!!.rp) + '%' }} />
                  </div>

                  <div className='w-full flex items-center space-x-2'>
                    <p className='text-xs'>{getRankRP(getNextRank(profile!!.rp))}</p>
                    <div className='w-full h-[2px] w-full rounded-r-full' style={{
                      background: 'repeating-linear-gradient(to right, #282828 0, #282828 3px, transparent 3px, transparent 7px)',
                    }} />
                  </div>
                </div>

                <div className='flex flex-col items-center justify-center space-y-2'>
                  <p className='text-amber-400 font-medium'>{profile!!.rp} RANKED POINTS</p>
                  <p className='font-light text-xs text-center'>
                    Earn ranked points by winning Ranked matches<br />
                    and get to {getRankRP(getNextRank(profile!!.rp))} RP to advance to the next rank.
                  </p>
                </div>

              </div>

              <button className='w-full py-1.5 bg-accent rounded font-medium text-sm'
                      onClick={() => joinQueue(MatchType.RANKED_1vs1)}>
                Join queue
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default Home;
