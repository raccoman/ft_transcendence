import { FC } from 'react';
import Link from 'next/link';

export const Message: FC<{
  self: boolean
  channel: any
  message: any
}> = ({ self, channel, message }) => {

  const timestamp = new Date(message.updated_at).toLocaleTimeString().substring(0, 5);

  if (self) {
    return (
      <div className='flex w-full'>
        <div className='flex-[1_3_0%]' />
        <div className='flex-[2_3_0%] flex flex-col text-sm bg-accent/30 rounded rounded-br-none px-2 py-1'>
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
      <div className='flex-[2_3_0%] flex flex-col text-sm bg-primary-400 rounded rounded-bl-none px-2 py-1 space-y-1'>

        <div className='flex justify-between items-center'>
          <Link href={'/profile/' + message.profile.id} passHref>
            <p className='font-medium text-accent cursor-pointer hover:underline'>{message.profile.username}</p>
          </Link>
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