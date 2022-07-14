import { FC, useEffect, useRef } from 'react';
import { Channel } from 'types/graphql';
import { useSession } from 'src/contexts';
import { Message } from 'src/components/chat/message';

const Component: FC<{ channel: Channel }> = ({ channel }) => {

  const { profile } = useSession();
  const gridBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridBottomRef || !gridBottomRef.current)
      return;
    gridBottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [channel]);

  return (
    <div className='grid grid-cols-1 gap-2 p-2 overflow-y-scroll overflow-x-clip max-h-[200px] w-full'>
      {channel.messages.map((message, index) => (
        <Message key={index} self={message.profile.id === profile?.id} channel={channel} message={message} />
      ))}
      <div ref={gridBottomRef} />
    </div>
  );
};

export default Component;