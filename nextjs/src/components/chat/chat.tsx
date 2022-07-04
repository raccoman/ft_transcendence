import { FC, useEffect, useRef } from 'react';
import { Channel } from 'types/graphql';
import { CaretCircleUp, X } from 'phosphor-react';
import { useSession } from 'src/contexts';
import { Message } from './message';

export const Chat: FC<{
  channel: Channel
  onSend: (message: string) => void
  onClose: () => void
}> = ({ channel, onSend, onClose }) => {

  const { profile } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const gridBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridBottomRef || !gridBottomRef.current)
      return;
    gridBottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [channel]);

  return (
    <div className='flex flex-col justify-between border border-primary-400 rounded-tr-md rounded-tl-md w-[300px]'>

      <div className='flex flex-col space-y-1 px-5 py-2 w-full'>

        <div className='flex justify-between items-center w-full'>
          <p className='font-medium align-middle'>{channel.name}</p>
          <button className='rounded-full p-1.5 hover:bg-secondary/10' onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className='h-[1px] bg-primary-400 w-full' />

        <div className='grid grid-cols-1 gap-2 p-2 overflow-y-scroll overflow-x-clip max-h-[200px] w-full'>
          {channel.messages.map((message, index) => (
            <Message key={index} self={message.profile.id === profile?.id} message={message} />
          ))}
          <div ref={gridBottomRef} />
        </div>

      </div>

      <form onSubmit={(e) => {

        e.preventDefault();

        if (!inputRef.current)
          return;

        onSend(inputRef.current.value ?? '');
        inputRef.current.value = '';

      }} className='bg-primary-500 p-2.5 flex space-x-2.5 items-center'>
        <input ref={inputRef} type='text' placeholder='Write a message...'
          className='bg-primary-400 w-full text-sm rounded-md px-2 py-1 outline-none border border-transparent focus:border-accent'
          required />
        <button type='submit'>
          <CaretCircleUp size={24} weight='duotone' className='text-accent' />
        </button>
      </form>

    </div>
  );
};