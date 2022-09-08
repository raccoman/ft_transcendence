import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { GET_BACKGROUNDS } from 'graphql/queries';
import { CircleNotch } from 'phosphor-react';
import { Background } from 'types/graphql';
import Image from 'next/image';
import _ from 'lodash';
import { useSession } from 'src/contexts';

const Store: NextPage = () => {

  const { profile } = useSession();
  const { loading, data } = useQuery(GET_BACKGROUNDS);

  if (loading) {
    return (
      <div className='h-full px-5 py-2 flex items-center justify-center'>
        <CircleNotch size={24} className='text-accent animate-spin' />
      </div>
    );
  }

  return (
    <div className='px-5 py-20 flex flex-col items-center space-y-10'>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>

        {_.orderBy(data.backgrounds, ['price'], ['desc'])
          .map((background: Background, index: number) => {

            let color;
            switch (background.rarity) {
              case 'COMMON': {
                color = 'bg-green-500/95';
                break;
              }
              case 'RARE': {
                color = 'bg-blue-500/95';
                break;
              }
              case 'EPIC': {
                color = 'bg-purple-500/95';
                break;
              }
              case 'LEGENDARY': {
                color = 'bg-amber-500/95';
                break;
              }
            }

            return (
              <div className='relative w-[300px] h-[500px] rounded border border-primary-400 group'>

                <img src={process.env.NEXT_PUBLIC_NESTJS_BASE_URL + '/assets/background/' + background.id + '.jpeg'}
                     className='rounded w-full h-full object-cover' />

                <div
                  className={`absolute bottom-[50px] group-hover:bottom-[100px] w-[300px] h-[80px] ${color} flex flex-col items-center justify-center transition-all ease-in-out`}>
                  <p className='text-lg font-medium'>{background.name}</p>
                  <p>{background.rarity}</p>
                </div>

                <div
                  className={`rounded-b absolute bottom-0 w-[300px] h-[50px] group-hover:h-[100px] bg-primary-500 flex flex-col items-center justify-center space-y-2 px-5 transition-all ease-in-out`}>

                  <div className='flex items-center justify-center space-x-2'>
                    <p className='text-lg font-medium'>{background.price}</p>
                    <div className='flex justify-center items-center'>
                      <Image src='/assets/gem.svg' width={24} height={24} layout='fixed' />
                    </div>
                  </div>

                  <button disabled={profile!.gems < background.price}
                          className='disabled:cursor-not-allowed hidden group-hover:block w-full py-1.5 bg-accent rounded font-medium text-sm'>
                    Acquista
                  </button>

                </div>

              </div>
            );

          })}

      </div>

    </div>
  );
};

export default Store;