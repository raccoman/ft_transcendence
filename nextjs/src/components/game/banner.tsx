import { FC } from 'react';
import { Heartbeat, HeartBreak } from 'phosphor-react';
import { toMMSS } from 'src/utils/timestamp';
import type { Match } from 'types';

const Component: FC<{ match: Match }> = ({ match }) => {

  const [a, b] = match.players;

  return (

    <div className='flex items-center justify-center py-2.5 px-10 space-x-10 border border-primary-400 rounded'>

      <p className='text-xl font-medium w-[150px] text-center'>{a.profile.username}</p>
      <div className='flex items-center space-x-2'>

        {[...Array(a.lives)].map((value, index) => (
          <Heartbeat key={index} className='text-red-600' weight='duotone' size={32} />
        ))}

        {[...Array(match.settings.lives - a.lives)].map((value, index) => (
          <HeartBreak key={index} className='text-primary-400' weight='duotone' size={32} />
        ))}

      </div>

      <div className='py-2 px-4 border border-primary-400 rounded'>
        <p className='text-xl font-medium font-mono'>{toMMSS(match.timings.elapsed)}</p>
      </div>

      <div className='flex items-center space-x-2'>

        {[...Array(match.settings.lives - b.lives)].map((value, index) => (
          <HeartBreak key={index} className='text-primary-400' weight='duotone' size={32} />
        ))}

        {[...Array(b.lives)].map((value, index) => (
          <Heartbeat key={index} className='text-red-600' weight='duotone' size={32} />
        ))}

      </div>
      <p className='text-xl font-medium w-[150px] text-center'>{b.profile.username}</p>

    </div>

  );
};

export default Component;