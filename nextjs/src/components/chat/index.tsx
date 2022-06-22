import { FC, useState } from 'react';
import { useChat, useSession } from 'src/contexts';
import { CaretDown, CaretUp, PencilSimpleLine } from 'phosphor-react';

const Component: FC = () => {

  const { profile } = useSession();
  const { channels } = useChat();

  const [isExpandend, setExpandend] = useState(false);

  return (
    <div className='absolute bottom-0'>

      <div
        className='flex flex-col items-center border border-primary-400 px-5 py-1.5 rounded-tr-md rounded-tl-md ml-5 space-y-1.5'>

        <div className='flex space-x-10 justify-between'>
          <div className='flex items-center space-x-2.5'>

            <div className='relative'>
              <div className='border border-primary-400 rounded-full overflow-hidden'>
                <img src={profile?.avatar || '/assets/default-avatar.png'} className='w-[32px] h-[32px] object-cover'
                     alt='avatar' />
              </div>
              <span className='absolute right-0 bottom-0 inline-flex rounded-full h-3 w-3 bg-green-500'></span>
              <span
                className='absolute right-0 bottom-0 inline-flex rounded-full h-3 w-3 bg-green-500/75 animate-ping'></span>
            </div>

            <p className='font-medium'>Messages</p>

          </div>
          <div className='flex'>

            <button className='rounded-full p-2 hover:bg-secondary/10'>
              <PencilSimpleLine size={18} />
            </button>

            <button className='rounded-full p-2 hover:bg-secondary/10' onClick={() => setExpandend(!isExpandend)}>
              {isExpandend ? (<CaretDown size={18} />) : (<CaretUp size={18} />)}
            </button>

          </div>
        </div>

        {isExpandend && (
          <div className='grid grid-cols-1 divide-y divide-primary-400'>

            {channels.map((channel, index) => {
              return (
                <div key={index}>
                  <p>{channel.name}</p>
                </div>
              );
            })}

          </div>
        )}

      </div>

    </div>
  );

};

export default Component;