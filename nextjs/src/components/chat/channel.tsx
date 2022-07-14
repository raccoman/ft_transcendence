import { Dispatch, FC, SetStateAction } from 'react';
import { Lock } from 'phosphor-react';
import { Channel as TChannel } from 'types/graphql';

export const Channel: FC<{
  channel: TChannel,
  ID: string | undefined,
  setID: Dispatch<SetStateAction<string | undefined>>
}> = ({ channel, ID, setID }) => {
  return (
    <div className='flex justify-between items-center py-2'>
      <label className='flex items-center space-x-2'>
        <p>{channel.name}</p>
        {channel.type != 'PUBLIC' && (<Lock size={12} weight='duotone' />)}
      </label>
      {ID === channel.id && (
        <button onClick={() => setID(undefined)} className='text-accent underline'>
          Close
        </button>
      )}
      {ID !== channel.id && (
        <button onClick={() => setID(channel.id)} className='text-accent underline'>
          Open
        </button>
      )}
    </div>
  );
};