import { NextPage } from 'next';
import { useSession } from 'src/contexts';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Profile } from 'types/graphql';
import { getCurrentRank } from 'src/utils/ranks';
import _ from 'lodash';
import { CircleNotch } from 'phosphor-react';

const Profile: NextPage = () => {

  const router = useRouter();
  const { id } = router.query;
  const { profile: me, uploadAvatar } = useSession();

  const [isLoading, setLoading] = useState(true);
  const [amount, setAmount] = useState(5);
  const [profile, setProfile] = useState<Profile | undefined>(undefined);

  useEffect(() => {

    try {

      setLoading(true);

      if (id == me?.id) {
        setProfile(me);
        return;
      }

    } finally {
      setLoading(false);
    }

  }, [me]);

  if (isLoading) {
    return (
      <div className='h-full px-5 py-2 flex items-center justify-center'>
        <CircleNotch size={24} className='text-accent animate-spin' />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className='h-full px-5 py-2 flex items-center justify-center'>

        <div className='flex divide-x space-x-5'>
          <h1 className='text-accent font-bold text-5xl'>404</h1>
          <div className='flex flex-col pl-5 space-y-2'>
            <h1 className='font-bold text-5xl'>Profile Not Found</h1>
            <p className='text-md text-gray-500'>Please check the URL in the address bar and try again.</p>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className='flex flex-col items-center py-20 px-5'>

      <div className='flex flex-col items-center space-y-10'>

        <div className='flex items-end justify-between space-x-40'>

          <div className='flex space-x-5'>

            <div className='border border-accent rounded w-[200px] h-[200px] relative group overflow-hidden'>
              <img src={profile?.avatar || '/assets/default-avatar.png'} className='rounded w-full h-full object-cover'
                   alt='avatar' />

              {profile.id === me?.id && (
                <div
                  className='absolute bottom-0 w-[200px] h-[50px] bg-primary-500/95 items-center justify-center hidden group-hover:flex'>
                  <label htmlFor='dropzone-file'
                         className='flex flex-col justify-center items-center w-full h-full cursor-pointer'>
                    <div className='flex flex-col justify-center items-center'>
                      <p className='text-sm'>Click to upload</p>
                      <p className='text-xs font-extralight'>SVG, PNG, JPG or GIF</p>
                    </div>
                    <input id='dropzone-file' type='file' onChange={uploadAvatar}
                           accept='image/svg+xml, image/jpeg, image/png, image/gif' className='hidden' />
                  </label>
                </div>
              )}
            </div>

            <div className='min-h-full flex flex-col justify-between'>

              <div className='flex flex-col'>

                <p className='font-semibold text-2xl'>{profile.username}</p>

                {_.once(() => {

                  const date = new Date(profile?.updated_at);

                  if (_.now() - date.getTime() > 300000) {
                    return (
                      <div className='flex space-x-2 items-center'>
                        <div className='relative inline-flex rounded-full h-3 w-3 bg-red-500' />
                        <p className='text-sm font-extralight'>Offline</p>
                      </div>
                    );
                  }

                  return (
                    <div className='flex space-x-2 items-center'>
                      <div className='relative inline-flex rounded-full h-3 w-3 bg-green-500'>
                        <span
                          className='absolute top-0 inline-flex rounded-full h-3 w-3 bg-green-500/75 animate-ping' />
                      </div>
                      <p className='text-sm font-extralight'>Online</p>
                    </div>
                  );

                })()}

              </div>

              <div className='bg-primary-500 p-2.5 rounded flex items-end space-x-2.5'>

                <div className='bg-primary-400 p-1 rounded flex items-center justify-center'>
                  <Image src={`/assets/ranks/${getCurrentRank(profile.rp)}.svg`} width={96} height={96}
                         alt='current-rank' />
                </div>

                <p className='text-amber-400 text-lg font-medium whitespace-nowrap'>{profile.rp}<br />RANKED POINTS</p>

              </div>

            </div>

          </div>

          <div className='rounded bg-primary-400 p-5 flex space-x-5 justify-center'>

            <div className='flex flex-col items-center'>
              <p className='font-extralight'>Wins</p>
              <p className='font-medium'>{profile.wins.length}</p>
            </div>

            <div className='flex flex-col items-center'>
              <p className='font-extralight'>Games</p>
              <p className='font-medium'>{profile.wins.length + profile.defeats.length}</p>
            </div>

            <div className='flex flex-col items-center'>
              <p className='font-extralight'>Win Rate</p>
              <p
                className='font-medium'>{(profile.wins.length / (profile.wins.length + profile.defeats.length) * 100).toFixed(2)} %</p>
            </div>

          </div>

        </div>

        <div className='flex flex-col space-y-5 w-full'>
          <p className='text-xl font-medium'>Match History</p>

          <div className='grid grid-cols-1 gap-2 w-full'>
            {_.orderBy(_.merge(profile.wins, profile.defeats), ['started_at'], ['desc'])
              .slice(0, amount)
              .map((match, index) => (

                <div key={index}
                     className='flex justify-between p-2 bg-primary-500 rounded w-full space-x-40 items-center'>

                  {_.once(() => {

                    const isVictory = match.winner.id === profile?.id;
                    const date = new Date(match.started_at);

                    return (
                      <>
                        <div className='flex space-x-5'>

                          <div className='bg-primary-400 p-2.5 rounded flex justify-center items-center'>
                            <Image src='/assets/game.svg' width={32} height={32} />
                          </div>


                          <div className='flex flex-col'>
                            <p
                              className={`font-medium ${isVictory ? 'text-green-500' : 'text-red-500'}`}>{isVictory ? 'VICTORY' : 'DEFEAT'}</p>
                            <p
                              className='font-extralight text-sm'>{match.type == 'DRAFT_1vs1' ? 'Draft 1vs1' : 'Ranked 1vs1'}</p>
                          </div>


                        </div>

                        <div className='flex space-x-2 items-center'>
                          <p>{match.winner.username}</p>
                          <span className='font-medium text-xl text-amber-500'>VS</span>
                          <p>{match.loser.username}</p>
                        </div>

                        <div className='flex flex-col'>

                          <div className='flex self-end items-center'>
                            <p className='mr-1'>+ {isVictory ? 25 : 5}</p>
                            <Image src='/assets/gem.svg' width={18} height={18} layout='fixed' />
                          </div>

                          <p className='font-extralight text-sm'>
                            {date.toLocaleTimeString() + ' - ' + date.toLocaleDateString()}
                          </p>

                        </div>
                      </>
                    );

                  })()}

                </div>
              ))
            }
          </div>

          {_.merge(profile.defeats, profile.wins).length > amount && (
            <button onClick={() => setAmount(amount + 5)}
                    className='w-full flex items-center justify-center bg-primary-500 rounded p-2'>Load more...</button>
          )}

        </div>

      </div>

    </div>
  );
};

export default Profile;