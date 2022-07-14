import { FC, FormEventHandler, useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { SpinnerGap } from 'phosphor-react';
import { useChat } from 'src/contexts';

const Component: FC<{ isOpen: boolean, onClose: any, id: string | undefined }> = ({ isOpen, onClose, id }) => {

  const { deleteChannel } = useChat();
  const initialFocus = useRef(null);

  const [isLoading, setLoading] = useState(false);
  const [hasFailed, setFailed] = useState(false);

  const onDeleteChannel = async () => {

    if (!id)
      return;

    try {
      setLoading(true);
      await deleteChannel({ variables: { id } });
      setFailed(false);
      onClose();
    } catch (ex) {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog as='div' className='fixed z-10 inset-0 overflow-hidden flex justify-center'
            initialFocus={initialFocus}
            open={isOpen}
            onClose={onClose}>

      <div className='h-full max-w-md p-4 flex items-center justify-center'>

        <Dialog.Overlay className='fixed inset-0 backdrop-blur-sm' />

        <div className='relative border border-primary-400 rounded-lg overflow-hidden shadow-xl'>

          <div className='flex flex-col text-center items-center py-8 px-4 space-y-4'>

            <Dialog.Title as='h3' className='text-lg font-semibold'>
              Delete channel
            </Dialog.Title>

            <Dialog.Description as='p' className='text-sm'>
              Are you sure you want to delete the channel?<br />This action cannot be undone.
            </Dialog.Description>

            {hasFailed && (
              <p className='text-sm text-red-600'>
                An error occured while deleting the channel.
              </p>
            )}

          </div>

          {isLoading && (
            <div className='bg-primary-500 p-2.5 flex items-center justify-center'>
              <SpinnerGap className='animate-spin' size={24} weight='bold' />
            </div>
          )}

          {!isLoading && (
            <div className='bg-primary-500 p-2.5 flex flex-col space-y-2'>
              <button
                className='bg-red-600 font-medium p-1.5 rounded-md'
                onClick={onDeleteChannel}>
                Confirm
              </button>
              <button
                className='bg-primary-400 font-medium p-1.5 rounded-md'
                onClick={onClose}
                ref={initialFocus}>
                Cancel
              </button>
            </div>
          )}

        </div>

      </div>

    </Dialog>
  );
};

export default Component;