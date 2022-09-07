import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { TOP_100 } from 'graphql/queries';
import { Profile } from 'types/graphql';
import { CircleNotch } from 'phosphor-react';
import _ from 'lodash';
import { ProfileStatus } from 'src/components';
import Image from 'next/image';
import { getCurrentRank } from 'src/utils/ranks';
import Link from 'next/link';


const Leaderboard: NextPage = () => {

  const { loading, data, refetch } = useQuery(TOP_100);

  if (loading) {
    return (
      <div className='h-full px-5 py-2 flex items-center justify-center'>
        <CircleNotch size={24} className='text-accent animate-spin' />
      </div>
    );
  }

  return (
    <div className='px-5 py-20 flex flex-col items-center'>

      <div className='grid grid-cols-1'>
        {data.top_100.map((profile: Profile, index: number) => (
          <div className='flex p-2 bg-primary-500 rounded justify-between space-x-52'>

            <div className='flex space-x-5 items-center'>

              <div className='bg-primary-400 rounded flex justify-center items-center w-[50px] h-[50px]'>
                <p className='font-bold text-2xl'>
                  {index + 1}<span className='font-bold text-sm'>#</span>
                </p>
              </div>

              <div className='border border-accent rounded w-[50px] h-[50px] overflow-hidden'>
                <img src={profile?.avatar || '/assets/default-avatar.png'}
                     className='rounded w-full h-full object-cover' alt='avatar' />
              </div>

              <div className='flex flex-col'>
                <Link href={'/profile/' + profile.id} passHref>
                  <a className='font-semibold text-2xl hover:underline'>{profile.username}</a>
                </Link>
                <ProfileStatus profile={profile} />
              </div>

            </div>

            <div className='flex space-x-5 items-center'>
              <div className='flex space-x-5 items-center'>
                <p className='font-medium text-amber-500'>{profile.rp} RP</p>
              </div>

              <div className='bg-primary-400 rounded flex items-center justify-center'>
                <Image src={`/assets/ranks/${getCurrentRank(profile.rp)}.svg`} width={60} height={60}
                       alt='current-rank' />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Leaderboard;