import { FC, useEffect, useState } from 'react';
import { useChat, useSession } from 'src/contexts';
import {
  CaretDown,
  CaretUp,
  PencilSimpleLine,
  Lock,
} from 'phosphor-react';
import { Chat } from './chat';
import { JoinableChat } from './joinable';
import { Channel } from 'types/graphql';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from 'src/graphql/mutations';

const Component: FC = () => {

  const { profile } = useSession();
  const { channels, joinChannel, sendMessage } = useChat();

  const [isExpandend, setExpandend] = useState(false);

  const [ID, setID] = useState<string | undefined>(undefined);
  const [channel, setChannel] = useState<Channel | undefined>(undefined);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {

    if (ID == undefined) {
      setChannel(undefined);
      return;
    }

    const index = channels.findIndex(x => x.id == ID);
    if (index < 0) {
      setChannel(undefined);
      return;
    }

    setChannel(channels[index]);

    for (const partecipant of channels[index].partecipants ?? []) {
      if (partecipant.profile.id === profile?.id) {
        setHasJoined(true);
        return;
      }
    }

    setHasJoined(false);

  }, [ID, channels]);

  const onSendMessage = async (message: string) => {
    message = message.trim();
    if (message.length <= 0)
      return;

    await sendMessage({ variables: { id: ID, text: message } });
  };

  const onJoinChannel = async (password: string | undefined) => {
    await joinChannel({ variables: { id: ID, password } });
  };

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
                  <button onClick={() => setID(ID == channel.id ? undefined : channel.id)}
                    className='text-accent underline'>
                    Open
                  </button>
                </div>
              );
            })}

          </div>
        )}

      </div>

      {isExpandend && channel && !hasJoined && (
        <JoinableChat channel={channel} onJoin={onJoinChannel} onClose={() => setID(undefined)} />
      )}

      {isExpandend && channel && hasJoined && (
        <Chat channel={channel} onSend={onSendMessage} onClose={() => setID(undefined)} />
      )}

    </div>
  );

};

export default Component;