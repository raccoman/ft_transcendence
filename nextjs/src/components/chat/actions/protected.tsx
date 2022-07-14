import { FC, useRef, useState } from 'react';
import { Channel } from 'types/graphql';
import { useChat } from 'src/contexts';
import { LockKeyOpen } from 'phosphor-react';

const Component: FC<{ channel: Channel }> = ({ channel }) => {

  const { joinChannel } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasFailed, setFailed] = useState(false);

  const onJoinChannel = async (password: string) => {
    try {
      await joinChannel({ variables: { id: channel.id, password } });
    } catch (ex) {
      setFailed(true);
      setTimeout(() => setFailed(false), 800);
    }
  };

  return (
    <form onSubmit={(e) => {

      e.preventDefault();

      if (!inputRef.current)
        return;

      onJoinChannel(inputRef.current.value ?? '');
      inputRef.current.value = '';

    }} className='bg-primary-500 p-2.5 flex space-x-2.5 items-center'>
      {!hasFailed && (
        <>
          <input ref={inputRef} type='text' placeholder='Enter the passsword...'
                 className='bg-primary-400 w-full text-sm rounded-md px-2 py-1 outline-none border border-transparent focus:border-accent'
                 required />
          <button type='submit'>
            <LockKeyOpen size={24} weight='duotone' className='text-accent' />
          </button>
        </>
      )}
      {hasFailed && (
        <input ref={inputRef} type='text' placeholder='Wrong password!'
               className='placeholder-white bg-red-400 w-full text-sm rounded-md px-2 py-1 outline-none border border-red-600 animate-pulse'
               required disabled />
      )}
    </form>
  );
};

export default Component;