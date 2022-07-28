import { FC, useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { HourglassMedium, SpinnerGap } from 'phosphor-react';

const Component: FC<{ isOpen: boolean, onClose: any }> = ({ isOpen, onClose }) => {

  const initialFocus = useRef(null);

  const [isLoading, setLoading] = useState(false);

  return (
    <Dialog as='div' className='fixed z-10 inset-0 overflow-hidden flex justify-center'
            initialFocus={initialFocus}
            open={isOpen}
            onClose={onClose}>

      <div className='h-full max-w-md p-4 flex items-center justify-center'>

        <Dialog.Overlay className='fixed inset-0 backdrop-blur-sm' />

        <div className='relative bg-primary-600 border border-primary-400 rounded-lg overflow-hidden shadow-xl'>

          <div className='flex flex-col text-center items-center py-2 px-20 space-y-4'>

            <Dialog.Title as='h3' className='text-lg font-semibold'>
              Queue - Draft 1vs1
            </Dialog.Title>

            <div className='flex flex-col text-center items-center py-4'>

              <HourglassMedium size={48} weight='duotone' className='text-accent animate-bounce' />

              <Dialog.Description as='p' className='text-sm py-4 font-light'>
                Waiting for opponent...
              </Dialog.Description>

            </div>

          </div>

          {isLoading && (
            <div className='bg-primary-500 p-2.5 flex items-center justify-center'>
              <SpinnerGap className='animate-spin' size={24} weight='bold' />
            </div>
          )}

          {!isLoading && (
            <div className='bg-primary-500 p-2.5 flex flex-col space-y-2'>
              <button className='bg-red-600 font-medium p-1.5 rounded-md w-full' onClick={onClose}>
                Leave Queue
              </button>
            </div>
          )}

        </div>

      </div>

    </Dialog>
  );
};

export default Component;