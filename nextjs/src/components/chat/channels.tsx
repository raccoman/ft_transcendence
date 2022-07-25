import { Dispatch, FC, SetStateAction, useState } from 'react';
import { CaretDown, CaretUp, CirclesThreePlus } from 'phosphor-react';
import { useChat, useSession } from 'src/contexts';
import { Channel } from 'src/components/chat/channel';
import { ChannelCreateDialog } from 'src/components/chat/dialogs';

export const Channels: FC<{
  isExpanded: boolean,
  setExpanded: Dispatch<SetStateAction<boolean>>,
  ID: string | undefined,
  setID: Dispatch<SetStateAction<string | undefined>>
}> = ({ isExpanded, setExpanded, ID, setID }) => {

  const { profile } = useSession();
  const { channels, joinChannel, sendMessage } = useChat();

  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <>

      <ChannelCreateDialog isOpen={isCreateDialogOpen} onClose={() => setCreateDialogOpen(false)} />

      <div className='self-end flex flex-col divide-y divide-primary-400 border border-primary-400 px-5 py-2 rounded-tr-md rounded-tl-md space-y-2 bg-primary-600'>

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

            <button className='rounded-full p-2 hover:bg-secondary/10' onClick={() => setCreateDialogOpen(true)}>
              <CirclesThreePlus size={18} />
            </button>

            <button className='rounded-full p-2 hover:bg-secondary/10' onClick={() => setExpanded(!isExpanded)}>
              {isExpanded ? (<CaretDown size={18} />) : (<CaretUp size={18} />)}
            </button>

          </div>

        </div>

        {isExpanded && (
          <div className='grid grid-cols-1 divide-y divide-primary-400 items-start pt-2 px-2'>

            {channels.length <= 0 && (
              <div className='h-full flex justify-center items-center min-h-[150px]'>
                <p className='text-center font-light'>Apparently no one wants<br />to talk with you...</p>
              </div>
            )}

            {channels.map((channel, index) => {
              return (
                <Channel key={index} channel={channel} ID={ID} setID={setID} />
              );
            })}

          </div>
        )}

      </div>
    </>
  );
};