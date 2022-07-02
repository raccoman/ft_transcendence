import { FC } from 'react';

export const Message: FC<{
  self: boolean
  message: any
}> = ({ self, message }) => {

  const timestamp = new Date(message.updated_at).toLocaleTimeString().substring(0, 5);

  if (self) {
    return (
      <div className='flex w-full'>
        <div className='flex-[1_3_0%]' />
        <div className='flex-[2_3_0%] flex flex-col text-sm bg-accent/30 rounded-lg rounded-br-none px-2 py-1'>
          <p>{message.text}</p>
          <p className='text-secondary/50 text-xxs self-end font-mono'>
            {timestamp}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex w-full'>
      <div className='flex-[2_3_0%] flex flex-col text-sm bg-primary-400 rounded-lg rounded-bl-none px-2 py-1'>
        <p className='font-medium text-accent'>{message.profile.username}</p>
        <p>{message.text}</p>
        <p className='text-secondary/50 text-xxs self-end font-mono'>
          {timestamp}
        </p>
      </div>
      <div className='flex-[1_3_0%]' />
    </div>
  );
};