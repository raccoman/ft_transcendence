import { FC } from 'react';

const Component: FC = () => (
  <div className='grid grid-cols-1 gap-2 p-2 overflow-hidden max-h-[200px]'>
    {Array.from(Array(5).keys()).map((n, index) => {

      const random = n % 3 == 0;

      return (
        <div key={index} className='grid grid-cols-3 animate-pulse'>

          {random && (<div className='col-span-1' />)}

          <div className={`${random ? 'rounded-bl-none' : 'rounded-br-none'} col-span-2 flex flex-col bg-primary-400 rounded-lg px-2 py-2 space-y-2`}>
            <div className='h-2 bg-primary-500 rounded' />
            <div className='grid grid-cols-3 gap-4'>
              <div className={`${random ? 'col-span-2' : 'col-span-1'} h-2 bg-primary-500 rounded`} />
              <div className={`${random ? 'col-span-1' : 'col-span-2'} h-2 bg-primary-500 rounded`} />
            </div>
          </div>

          {random && (<div className='col-span-1' />)}

        </div>
      );
    })}
  </div>
);

export default Component;