import { FC } from 'react';
import { Plugs } from 'phosphor-react';

const Component: FC = () => (
  <div className='bg-primary-500 p-2.5 flex space-x-2.5 items-center'>
    <div className='bg-red-400 w-full text-xs rounded border border-red-600 px-2 py-1 flex items-center space-x-2'>
      <Plugs size={48} className='text-red-600' />
      <p className='font-medium'>
        You have been banned by an admin.
        You are not allowed to partecipate in this channel anymore...
      </p>
    </div>
  </div>
);

export default Component;