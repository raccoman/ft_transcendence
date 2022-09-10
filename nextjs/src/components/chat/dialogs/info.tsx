import { FC, useRef } from 'react';
import { Channel, Partecipant } from 'types/graphql';
import { Dialog } from '@headlessui/react';
import { useChat } from 'src/contexts';
import {
  Crown,
  PersonSimple, Plugs,
  PlugsConnected,
  SpeakerSimpleHigh,
  SpeakerSimpleSlash,
  Sword,
  X,
} from 'phosphor-react';
import Link from 'next/link';

const isRoleHigher = (a: Partecipant, b: Partecipant) => {
  if (a.role == b.role)
    return 0;

  if (a.role == 'OWNER')
    return 1;

  if (b.role == 'OWNER')
    return -1;

  if (a.role == 'ADMIN')
    return 1;

  return -1;
};

const Component: FC<{
  isOpen: boolean,
  onClose: any,
  channel: Channel | undefined
  partecipant: Partecipant | undefined
}> = ({ isOpen, onClose, channel, partecipant }) => {

  const { upsertPunishment, leaveChannel } = useChat();
  const initialFocus = useRef(null);

  if (!channel || !partecipant)
    return null;

  const onUpsertPunishment = async (target: Partecipant, type: 'MUTE' | 'BAN', removed: boolean) => {
    try {

      await upsertPunishment({
        variables: {
          profile_id: target.profile.id,
          channel_id: channel.id,
          type: type,
          removed,
        },
      });

    } catch (ex) {
    }
  };

  const onLeaveChannel = async () => {
    try {

      await leaveChannel({
        variables: {
          id: channel.id,
        },
      });

      onClose();

    } catch (ex) {
    }
  };

  return (
    <Dialog as='div' className='fixed z-10 inset-0 overflow-hidden flex justify-center'
            initialFocus={initialFocus}
            open={isOpen}
            onClose={onClose}>

      <div className='h-full max-w-md p-4 flex items-center justify-center'>

        <Dialog.Overlay className='fixed inset-0 backdrop-blur-sm' />

        <div className='relative bg-primary-600 border border-primary-400 rounded overflow-hidden shadow-xl p-2.5'>

          <div className='flex justify-between items-center space-x-28'>
            <h1 className='text-lg font-semibold'>Channel Info</h1>
            <button className='rounded-full p-1.5 hover:bg-secondary/10' onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <div className='flex flex-col py-8 space-y-4'>

            <Dialog.Title as='div' className='flex flex-col w-full items-center'>
              <p className='text-lg font-semibold text-accent'>{channel.name}</p>
              <p className='text-xs text-gray-500'>{channel.partecipants.length} members</p>
            </Dialog.Title>

            <div className='h-[1px] bg-primary-400 w-full' />

            <div className='grid grid-cols-1 px-2'>
              {channel.partecipants.map((p, index) => (
                <div key={index} className='flex items-center justify-between'>

                  <div className='flex items-center space-x-2'>

                    {p.role == 'OWNER' && (<Crown className='text-amber-600' weight='duotone' size={18} />)}
                    {p.role == 'ADMIN' && (<Sword className='text-green-600' weight='duotone' size={18} />)}
                    {p.role == 'MEMBER' && (
                      <PersonSimple className='text-gray-600' weight='duotone' size={18} />)}

                    <Link href={`/profile/${p.profile.id}`} passHref>
                      <a>{p.profile.username}</a>
                    </Link>

                  </div>

                  <div className='flex items-center space-x-2'>

                    {!p.muted && (
                      <button className='rounded-full p-1.5 hover:bg-secondary/10'
                              onClick={() => onUpsertPunishment(p, 'MUTE', false)}
                              disabled={!isRoleHigher(partecipant, p)}>
                        <SpeakerSimpleHigh className='text-gray-600' weight='duotone' size={18} />
                      </button>
                    )}

                    {p.muted && (
                      <button className='rounded-full p-1.5 hover:bg-secondary/10'
                              onClick={() => onUpsertPunishment(p, 'MUTE', true)}
                              disabled={!isRoleHigher(partecipant, p)}>
                        <SpeakerSimpleSlash className='text-accent' weight='duotone' size={18} />
                      </button>
                    )}

                    {!p.banned && (
                      <button className='rounded-full p-1.5 hover:bg-secondary/10'
                              onClick={() => onUpsertPunishment(p, 'BAN', false)}
                              disabled={!isRoleHigher(partecipant, p)}>
                        <PlugsConnected className='text-gray-600' weight='duotone' size={18} />
                      </button>
                    )}

                    {p.banned && (
                      <button className='rounded-full p-1.5 hover:bg-secondary/10'
                              onClick={() => onUpsertPunishment(p, 'BAN', true)}
                              disabled={!isRoleHigher(partecipant, p)}>
                        <Plugs className='text-accent' weight='duotone' size={18} />
                      </button>
                    )}

                  </div>

                </div>
              ))}
            </div>

          </div>

          <button className='bg-red-600 font-medium p-1.5 rounded w-full'
                  onClick={onLeaveChannel}
                  disabled={partecipant.muted || partecipant.banned}>
            {partecipant.role == 'OWNER' ? 'Delete channel' : 'Leave channel'}
          </button>

        </div>

      </div>

    </Dialog>
  );

};

export default Component;