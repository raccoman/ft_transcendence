import { FC } from 'react';
import { Channel } from 'types/graphql';
import { useSession } from 'src/contexts';
import { Tray } from 'phosphor-react';

const Component: FC<{ channel: Channel }> = ({ channel }) => {

  const { profile } = useSession();

  return (
    <div className='w-full flex items-center justify-center h-[200px]'>
      <div className='flex flex-col items-center justify-center'>
        <Tray className='text-gray-500' size={64} weight='duotone' />
        <p className='text-center text-sm font-light'>Apparently no one wants<br />to talk with you...</p>
      </div>
    </div>
  );
};

export default Component;