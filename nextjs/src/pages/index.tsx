import type { NextPage } from 'next';
import Image from 'next/image';
import { useGame, useSession } from 'src/contexts';
import { getCurrentRank, getNextRank, getPrevRank, getRankProgress, getRankRP } from 'src/utils/ranks';
import { MatchType } from 'types';
import { InQueueDialog } from 'src/components/game/dialogs';
import { toMMSS } from 'src/utils/timestamp';

const Home: NextPage = () => {

  const { profile } = useSession();
  const { inQueue, joinQueue, leaveQueue, onGoingMatches, spectateMatch } = useGame();

  return (
    <>

      <InQueueDialog isOpen={inQueue} onClose={leaveQueue} />

      <div className='p-20 flex flex-col items-center space-y-20'>

        <div className='grid grid-cols-2 gap-5'>

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

        <div className='grid grid-cols-1 border border-primary-400 rounded divide-y divide-primary-400'>
          {onGoingMatches.map((match, index) => (

            <div key={index} className='flex p-2 bg-primary-600 justify-between space-x-40 items-center rounded'>

              <div className='flex space-x-5'>

                <div className='bg-primary-400 p-2.5 rounded flex justify-center items-center'>
                  <Image src='/assets/game.svg' width={32} height={32} alt='' />
                </div>


                <div className='flex flex-col justify-center'>
                  <p
                    className='font-extralight text-sm'>{match.type == 'DRAFT_1vs1' ? 'Draft 1vs1' : 'Ranked 1vs1'}</p>
                  <p className='font-extralight text-sm'>{toMMSS(match.elapsed)}</p>
                </div>

              </div>

              <div className='flex space-x-2 items-center'>
                <p>{match.players[0].username}</p>
                <span className='font-medium text-xl text-amber-500'>VS</span>
                <p>{match.players[1].username}</p>
              </div>

              <button className='px-5 py-1.5 bg-accent rounded font-medium text-sm' onClick={() => spectateMatch(match.id)}>
                Spectate
              </button>

            </div>

          ))}
        </div>

      </div>

    </>
  );
};

export default Home;
