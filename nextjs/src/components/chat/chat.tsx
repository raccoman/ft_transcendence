import { FC, useEffect, useRef } from 'react';
import { Channel } from 'types/graphql';
import { CaretCircleUp, LockKeyOpen, X } from 'phosphor-react';
import { useSession } from 'src/contexts';
import { Message } from './message';

export const JoinableChat: FC<{
  channel: Channel
  onJoin: (password: string | undefined) => void
  onClose: () => void
}> = ({ channel, onJoin, onClose }) => {

  const { profile } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='flex flex-col justify-between border border-primary-400 rounded-tr-md rounded-tl-md w-[300px]'>

      <div className='flex flex-col space-y-1 px-5 py-2'>

        <div className='flex justify-between items-center'>
          <p className='font-medium align-middle'>{channel.name}</p>
          <button className='rounded-full p-1.5 hover:bg-secondary/10' onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className='h-[1px] bg-primary-400 w-full' />

        <div className='grid grid-cols-1 gap-2 p-2 overflow-hidden max-h-[200px]'>
          {Array.from(Array(5).keys()).map((n, index) => (
            <div key={index} className='grid grid-cols-3 animate-pulse'>

              {(n % 3 == 0) && (<div className='col-span-1' />)}
              <div
                className={`${n % 3 ? 'rounded-bl-none' : 'rounded-br-none'} col-span-2 flex flex-col bg-primary-400 rounded-lg px-2 py-2 space-y-2`}>
                <div className='h-2 bg-primary-500 rounded' />
                <div className='grid grid-cols-3 gap-4'>
                  <div className={`${n % 3 ? 'col-span-2' : 'col-span-1'} h-2 bg-primary-500 rounded`} />
                  <div className={`${n % 3 ? 'col-span-1' : 'col-span-2'} h-2 bg-primary-500 rounded`} />
                </div>
              </div>
              {(n % 3 != 0) && (<div className='col-span-1' />)}

            </div>
          ))}
        </div>

      </div>


      {channel.type === 'PROTECTED' && (
        <form className='bg-primary-500 p-2.5 flex space-x-2.5 items-center'>
          <input ref={inputRef} type='text' placeholder='Enter the passsword...'
                 className='bg-primary-400 w-full text-sm rounded-md px-2 py-1 outline-none border border-transparent focus:border-accent'
                 required />
          <button type='submit' onSubmit={() => onJoin(inputRef.current?.value ?? '')}>
            <LockKeyOpen size={24} weight='duotone' className='text-accent' />
          </button>
        </form>
      )}

      {channel.type === 'PUBLIC' && (
        <div className='bg-primary-500 p-2.5'>
          <button className='w-full py-1.5 bg-accent rounded-md font-medium text-sm' onSubmit={() => onJoin(undefined)}>
            Join channel
          </button>
        </div>
      )}

    </div>
  );
};

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

      <div className='flex flex-col space-y-1 px-5 py-2'>

        <div className='flex justify-between items-center'>
          <p className='font-medium align-middle'>{channel.name}</p>
          <button className='rounded-full p-1.5 hover:bg-secondary/10' onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className='h-[1px] bg-primary-400 w-full' />

        <div className='grid grid-cols-1 gap-2 p-2 overflow-y-scroll max-h-[200px]'>
          {channel.messages.map((message, index) => (
            <Message key={index} self={message.profile.id === profile?.id} message={message} />
          ))}
          <div ref={gridBottomRef} />
        </div>

      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        onSend(inputRef.current?.value ?? '');
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