import { FC, useEffect, useState } from 'react';
import { useChat, useSession } from 'src/contexts';
import { Channel, Partecipant } from 'types/graphql';
import { Channels } from 'src/components/chat/channels';
import { DotsThreeVertical, Trash, X } from 'phosphor-react';
import { MessagesContent, EmptyContent, ObfuscatedContent } from 'src/components/chat/contents';
import { BannedAction, MutedAction, ProtectedAction, PublicAction, SpeakAction } from 'src/components/chat/actions';
import { ChannelInfoDialog } from 'src/components/chat/dialogs';

const Component: FC = () => {

  const { profile } = useSession();
  const { channels } = useChat();

  const [isExpandend, setExpandend] = useState(false);

  const [id, setId] = useState<string | undefined>(undefined);
  const [channel, setChannel] = useState<Channel | undefined>(undefined);
  const [partecipant, setPartecipant] = useState<Partecipant | undefined>(undefined);

  const [isInfoDialogOpen, setInfoDialogOpen] = useState(false);

  useEffect(() => {

    if (id == undefined) {
      setChannel(undefined);
      return;
    }

    const index = channels.findIndex(x => x.id == id);
    if (index < 0) {
      setChannel(undefined);
      return;
    }

    setChannel(channels[index]);

    setPartecipant(undefined);
    for (const partecipant of channels[index].partecipants ?? []) {
      if (partecipant.profile.id === profile?.id) {
        setPartecipant(partecipant);
        return;
      }
    }

  }, [id, channels]);

  return (
    <>

      <ChannelInfoDialog isOpen={isInfoDialogOpen} onClose={() => setInfoDialogOpen(false)} channel={channel}
                         partecipant={partecipant} />

      <div className='fixed bottom-0 ml-5 flex space-x-5'>

        <Channels isExpanded={isExpandend} setExpanded={setExpandend} ID={id} setID={setId} />

        {channel && (
          <div className='flex flex-col justify-between border border-primary-400 rounded-tr-md rounded-tl-md w-[300px]'>
            <div className='flex flex-col space-y-1 px-5 py-2'>

              <div className='flex justify-between items-center'>
                <p className='font-medium'>{channel.name}</p>

                <div>
                  <button className='rounded-full p-1.5 hover:bg-secondary/10' onClick={() => setInfoDialogOpen(true)}>
                    <DotsThreeVertical size={18} />
                  </button>
                  <button className='rounded-full p-1.5 hover:bg-secondary/10' onClick={() => setId(undefined)}>
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className='h-[1px] bg-primary-400 w-full' />

              {(!partecipant || partecipant.banned) && (
                <ObfuscatedContent />
              )}

              {partecipant && !partecipant.banned && channel.messages.length <= 0 && (
                <EmptyContent channel={channel} />
              )}

              {partecipant && !partecipant.banned && channel.messages.length > 0 && (
                <MessagesContent channel={channel} />
              )}

            </div>

            {partecipant && partecipant.banned && (
              <BannedAction />
            )}

            {partecipant && partecipant.muted && !partecipant.banned && (
              <MutedAction />
            )}

            {partecipant && !partecipant.muted && !partecipant.banned && (
              <SpeakAction channel={channel} />
            )}

            {!partecipant && channel.type === 'PUBLIC' && (
              <PublicAction channel={channel} />
            )}

            {!partecipant && channel.type === 'PROTECTED' && (
              <ProtectedAction channel={channel} />
            )}

          </div>
        )}

      </div>
    </>
  );

};

export default Component;