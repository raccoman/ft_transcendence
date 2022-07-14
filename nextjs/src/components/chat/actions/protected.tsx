import { FC, useRef } from 'react';
import { Channel } from 'types/graphql';
import { useChat } from 'src/contexts';
import { LockKeyOpen } from 'phosphor-react';

const Component: FC<{ channel: Channel }> = ({ channel }) => {

  const { joinChannel } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);

  const onJoinChannel = async (password: string) => {
    await joinChannel({ variables: { id: channel.id } });
  };

  return (
    <form onSubmit={(e) => {

      e.preventDefault();

      if (!inputRef.current)
        return;

      onJoinChannel(inputRef.current.value ?? '');
      inputRef.current.value = '';

    }} className='bg-primary-500 p-2.5 flex space-x-2.5 items-center'>
      <input ref={inputRef} type='text' placeholder='Enter the passsword...'
             className='bg-primary-400 w-full text-sm rounded-md px-2 py-1 outline-none border border-transparent focus:border-accent'
             required />
      <button type='submit'>
        <LockKeyOpen size={24} weight='duotone' className='text-accent' />
      </button>
    </form>
  );
};

export default Component;