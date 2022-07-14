import { FC } from 'react';
import { Menu } from '@headlessui/react';
import { CaretDown, Plugs, SpeakerSimpleSlash } from 'phosphor-react';
import { useChat } from 'src/contexts';

const MessageMenu: FC<{
  addPunishment: any;
}> = ({ addPunishment }) => {
  return (
    <Menu as='div' className='relative'>
      <Menu.Button>
        <CaretDown size={12} />
      </Menu.Button>
      <Menu.Items
        className='absolute right-0 rounded-md bg-primary-400 border border-primary-600 flex flex-col py-1 shadow-md'>
        <Menu.Item>
          {({ active }) => (
            <button onClick={() => addPunishment('MUTE')}
                    className={`${active ? 'bg-primary-500' : ''} flex items-center space-x-2 px-2 text-sm`}>
              <SpeakerSimpleSlash size={16} weight='duotone' className='text-accent' />
              <p>Mute</p>
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button onClick={() => addPunishment('BAN')}
                    className={`${active ? 'bg-primary-500' : ''} flex items-center space-x-2 px-2 text-left text-sm`}>
              <Plugs size={16} weight='duotone' className='text-accent' />
              <p>Ban</p>
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export const Message: FC<{
  self: boolean
  channel: any
  message: any
}> = ({ self, channel, message }) => {

  const { upsertPunishment } = useChat();
  const timestamp = new Date(message.updated_at).toLocaleTimeString().substring(0, 5);

  const addPunishment = async (type: 'MUTE' | 'BAN') => {
    await upsertPunishment({
      variables: {
        profile_id: message.profile_id,
        channel_id: channel.id,
        type: type,
      },
    });
  };

  if (self) {
    return (
      <div className='flex w-full'>
        <div className='flex-[1_3_0%]' />
        <div className='flex-[2_3_0%] flex flex-col text-sm bg-accent/30 rounded-lg rounded-br-none px-2 py-1'>
          <div className='flex justify-between'>
            <p style={{ wordBreak: 'break-word' }} className='whitespace-pre-wrap'>{message.text}</p>
            <p className='text-secondary/50 text-xxs self-end font-mono'>
              {timestamp}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex w-full'>
      <div
        className='flex-[2_3_0%] flex flex-col text-sm bg-primary-400 rounded-lg rounded-bl-none px-2 py-1 space-y-1'>

        <div className='flex justify-between items-center'>
          <p className='font-medium text-accent'>{message.profile.username}</p>
          <MessageMenu addPunishment={addPunishment} />
        </div>

        <div className='flex justify-between'>
          <p style={{ wordBreak: 'break-word' }} className='whitespace-pre-wrap'>{message.text}</p>
          <p className='text-secondary/50 text-xxs self-end font-mono'>
            {timestamp}
          </p>
        </div>
      </div>
      <div className='flex-[1_3_0%]' />
    </div>
  );
};