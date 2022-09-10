import { FC } from 'react';
import { Channel } from 'types/graphql';
import { useChat } from 'src/contexts';

const Component: FC<{ channel: Channel }> = ({ channel }) => {

  const { joinChannel } = useChat();

  const onJoinChannel = async () => {
    await joinChannel({ variables: { id: channel.id } });
  };

  return (
    <div className='bg-primary-500 p-2.5 flex space-x-2.5 items-center'>
      <button className='w-full py-1.5 bg-accent rounded font-medium text-sm' onClick={onJoinChannel}>
        Join channel
      </button>
    </div>
  );
};

export default Component;