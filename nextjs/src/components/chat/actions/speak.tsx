import { FC, useRef } from 'react';
import { CaretCircleUp } from 'phosphor-react';
import { useChat } from 'src/contexts';
import { Channel } from 'types/graphql';

const Component: FC<{ channel: Channel }> = ({ channel }) => {

  const { sendMessage } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);

  const onSendMessage = async (message: string) => {
    message = message.trim();
    if (message.length <= 0)
      return;

    await sendMessage({ variables: { id: channel.id, text: message } });
  };

  return (
    <form onSubmit={(e) => {

      e.preventDefault();

      if (!inputRef.current)
        return;

      onSendMessage(inputRef.current.value ?? '');
      inputRef.current.value = '';

    }} className='bg-primary-500 p-2.5 flex space-x-2.5 items-center'>
      <input ref={inputRef} type='text' placeholder='Write a message...'
             className='bg-primary-400 w-full text-sm rounded-md px-2 py-1 outline-none border border-transparent focus:border-accent'
             required />
      <button type='submit'>
        <CaretCircleUp size={24} weight='duotone' className='text-accent' />
      </button>
    </form>
  );
};

export default Component;