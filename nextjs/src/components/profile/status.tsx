import { FC, useMemo } from 'react';
import { Profile } from 'types/graphql';
import _ from 'lodash';

const Component: FC<{ profile: Profile }> = ({ profile }) => {

  const date = useMemo(() => new Date(profile?.updated_at), [profile]);

  if (_.now() - date.getTime() > 300000) {
    return (
      <div className='flex space-x-2 items-center'>
        <div className='relative inline-flex rounded-full h-3 w-3 bg-red-500' />
        <p className='text-sm font-extralight'>Offline</p>
      </div>
    );
  }

  return (
    <div className='flex space-x-2 items-center'>
      <div className='relative inline-flex rounded-full h-3 w-3 bg-green-500'>
                        <span
                          className='absolute top-0 inline-flex rounded-full h-3 w-3 bg-green-500/75 animate-ping' />
      </div>
      <p className='text-sm font-extralight'>Online</p>
    </div>
  );

};
export default Component;