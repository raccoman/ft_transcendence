import { FC, useEffect, useState } from 'react';
import { useChat, useSession } from 'src/contexts';
import { Channel } from 'types/graphql';
import { Channels } from 'src/components/chat/channels';
import { X } from 'phosphor-react';
import { MessagesContent, ObfuscatedContent } from 'src/components/chat/contents';
import { BannedAction, MutedAction, ProtectedAction, PublicAction, SpeakAction } from 'src/components/chat/actions';

const Component: FC = () => {

  const { profile } = useSession();
  const { channels } = useChat();

  const [isExpandend, setExpandend] = useState(false);

  const [ID, setID] = useState<string | undefined>(undefined);
  const [channel, setChannel] = useState<Channel | undefined>(undefined);

  const [hasJoined, setHasJoined] = useState(false);
  const [isMuted, setMuted] = useState(false);
  const [isBanned, setBanned] = useState(false);

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

    setHasJoined(false);
    for (const partecipant of channels[index].partecipants ?? []) {
      if (partecipant.profile.id === profile?.id) {

        console.log(JSON.stringify(partecipant));

        setHasJoined(true);
        setMuted(partecipant.muted);
        setBanned(partecipant.banned);
        return;
      }
    }

  }, [ID, channels]);

  return (
    <div className='fixed bottom-0 ml-5 flex space-x-5'>

      <Channels isExpanded={isExpandend} setExpanded={setExpandend} ID={ID} setID={setID} />

      {channel && (
        <div className='flex flex-col justify-between border border-primary-400 rounded-tr-md rounded-tl-md w-[300px]'>
          <div className='flex flex-col space-y-1 px-5 py-2'>

            <div className='flex justify-between items-center'>
              <p className='font-medium align-middle'>{channel.name}</p>
              <button className='rounded-full p-1.5 hover:bg-secondary/10' onClick={() => setID(undefined)}>
                <X size={18} />
              </button>
            </div>

            <div className='h-[1px] bg-primary-400 w-full' />

            {(isBanned || !hasJoined) && (
              <ObfuscatedContent />
            )}

            {!isBanned && hasJoined && (
              <MessagesContent channel={channel} />
            )}

          </div>

          {isBanned && (
            <BannedAction />
          )}

          {isMuted && !isBanned && (
            <MutedAction />
          )}

          {hasJoined && !isMuted && !isBanned && (
            <SpeakAction channel={channel} />
          )}

          {!hasJoined && channel.type == 'PUBLIC' && !isMuted && !isBanned && (
            <PublicAction channel={channel} />
          )}

          {!hasJoined && channel.type == 'PROTECTED' && !isMuted && !isBanned && (
            <ProtectedAction channel={channel} />
          )}

        </div>
      )}

    </div>
  );

};

export default Component;