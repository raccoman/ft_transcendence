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
import { Channel } from 'types/graphql';

const Component: FC = () => {

  const { profile } = useSession();
  const { channels } = useChat();

  const [isExpandend, setExpandend] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);

  return (
    <div className='fixed bottom-0 ml-5 flex space-x-5'>

      <div
        className='self-end flex flex-col divide-y divide-primary-400 border border-primary-400 px-5 py-2 rounded-tr-md rounded-tl-md space-y-2'>

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

            <p className='font-medium align-middle'>Conversations</p>

          </div>
          <div className='flex items-center'>

            <button className='rounded-full p-2 hover:bg-secondary/10'>
              <PencilSimpleLine size={18} />
            </button>

            <button className='rounded-full p-2 hover:bg-secondary/10' onClick={() => setExpandend(!isExpandend)}>
              {isExpandend ? (<CaretDown size={18} />) : (<CaretUp size={18} />)}
            </button>

          </div>

        </div>

        {isExpandend && (
          <div className='grid grid-cols-1 divide-y divide-primary-400 items-start pt-2 px-2'>

            {channels.length <= 0 && (
              <div className='h-full flex justify-center items-center min-h-[150px]'>
                <p className='text-center font-light'>Apparently no one wants<br />to talk with you...</p>
              </div>
            )}

            {channels.map((channel, index) => {
              return (
                <div key={index} className='flex justify-between items-center py-2'>
                  <label className='flex items-center space-x-2'>
                    <p>{channel.name}</p>
                    {channel.type != 'PUBLIC' && (<Lock size={12} weight='duotone' />)}
                  </label>
                  <button onClick={() => setCurrentChannel(currentChannel == channel ? null : channel)}
                          className='text-accent underline'>
                    Join
                  </button>
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

            <div className='grid grid-cols-1 gap-2 pt-2 px-2 overflow-y-scroll h-80 scrollbar-thin scrollbar-thumb-primary-400 scrollbar-thumb-rounded-md'>
              {currentChannel.messages.map((message: any, index: number) => {

                if (message.profile.id == profile?.id) {
                  return (
                    <div key={index} className='flex w-full'>
                      <div className='flex-[1_3_0%]'>
                      </div>
                      <div key={message.id} className='flex-[2_3_0%] flex flex-col items-end text-sm bg-accent/25 rounded-lg rounded-br-none px-2 py-1'>
                        <p>{message.text}</p>
                        <p className='text-secondary/50 text-xs'>
                          {new Date(message.updated_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={index} className='flex w-full'>
                    <div className='flex-2 flex flex-col text-sm'>
                      <div className='flex space-x-1.5'>
                        <label className='flex'>
                          <p className='underline text-accent'>{message.profile.username}</p>
                          <p>:</p>
                        </label>
                        <p>{message.text}</p>
                      </div>
                      <p className='text-secondary/50 text-xs'>{new Date(message.updated_at).toLocaleTimeString()}</p>
                    </div>
                    <div className='flex-1'>
                    </div>
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