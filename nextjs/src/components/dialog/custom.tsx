import { useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { FCWithChildren } from 'types';
import { CircleNotch } from 'phosphor-react';


const Component: FCWithChildren<{
  isLoading?: boolean,
  isOpen: boolean,
  onClose: () => any
}> = ({ children, isLoading, isOpen, onClose }) => {

  const initialFocus = useRef(null);

  return (
    <Dialog as='div' className='fixed z-10 inset-0 overflow-hidden flex justify-center' initialFocus={initialFocus} open={isOpen} onClose={onClose}>
      <div className='h-full max-w-md p-4 flex items-center justify-center'>
        <div>
          <Dialog.Overlay className='fixed inset-0 backdrop-blur-sm' />
          <div className='relative bg-white rounded-lg overflow-hidden shadow-xl'>

            {!isLoading ? children : (
              <div className='h-full flex flex-col justify-center'>
                <div className='flex justify-center items-center'>
                  <div className='rounded-full flex items-center justify-center bg-placeholder-02 p-2 bg-'>
                    <CircleNotch className='animate-spin text-primary-01' size={54} />
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Component;