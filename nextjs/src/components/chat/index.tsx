import { FC, useState } from 'react';
import { useChat, useSession } from 'src/contexts';
import {
  CaretDown,
  CaretUp,
  PencilSimpleLine,
  X,
  Lock,
  CaretCircleUp,
} from 'phosphor-react';
import { Channels } from 'types/hasura';

const Component: FC = () => {

  const { profile } = useSession();
  const { channels } = useChat();

  const [isExpandend, setExpandend] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<Channels | null>(null);

  return (
    <div className='absolute bottom-0 ml-5 flex space-x-10'>

      <div
        className='flex flex-col divide-y divide-primary-400 border border-primary-400 px-5 py-2 rounded-tr-md rounded-tl-md space-y-2'>

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

            <p className='font-medium align-middle'>Direct Messages</p>

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
          <div className='grid grid-cols-1 divide-y divide-primary-400 items-start py-5 px-2'>

            {channels.length <= 0 && (
              <div className='h-full flex justify-center items-center min-h-[150px]'>
                <p className='text-center font-light'>Apparently no one wants<br />to talk with you...</p>
              </div>
            )}

            {channels.map((channel, index) => {
              return (
                <div key={index} className='flex justify-between items-center py-2'
                     onClick={() => setCurrentChannel(currentChannel == channel ? null : channel)}>
                  <label className='flex items-center space-x-2'>
                    <p>{channel.name}</p>
                    {channel.mode != 'PUBLIC' && (<Lock size={12} weight='duotone' />)}
                  </label>
                  <a className='text-accent underline'>Join</a>
                </div>
              );
            })}

          </div>
        )}

      </div>

      {isExpandend && currentChannel && (
        <div className='flex flex-col justify-between border border-primary-400 rounded-tr-md rounded-tl-md space-y-2 w-96'>

          <div className='flex flex-col divide-y divide-primary-400 px-5 py-2'>
            <div className='flex space-x-10 justify-between items-center'>

              <p className='font-medium align-middle'>{currentChannel.name}</p>

              <button className='rounded-full p-2 hover:bg-secondary/10' onClick={() => setCurrentChannel(null)}>
                <X size={18} />
              </button>

            </div>

            <div className='grid grid-cols-1 py-5 px-2'>
              {currentChannel.messsages.map((message: any, index: number) => {

                if (message.sender.id == profile?.id) {
                  return (
                    <div key={index} className='flex flex-col items-end text-sm'>
                      <div className='flex space-x-1.5'>
                        <p>{message.text}</p>
                      </div>
                      <p className='text-secondary/50 text-xs'>{new Date(message.timestamp).toLocaleTimeString()}</p>
                    </div>
                  );
                }

                return (
                  <div key={index} className='flex flex-col text-sm'>
                    <div className='flex space-x-1.5'>
                      <label className='flex'>
                        <p className='underline text-accent'>{message.sender.username}</p>
                        <p>:</p>
                      </label>
                      <p>{message.text}</p>
                    </div>
                    <p className='text-secondary/50 text-xs'>{new Date(message.timestamp).toLocaleTimeString()}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className='bg-primary-500 p-2.5 flex space-x-2.5 items-center'>
            <input className='bg-primary-400 w-full text-sm rounded-md px-2 py-1 outline-none border border-transparent focus:border-accent' />
            <button>
              <CaretCircleUp size={24} weight='duotone' className='text-accent' />
            </button>
          </div>

        </div>
      )}

    </div>
  );

};

export default Component;