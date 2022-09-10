import { FC, FormEventHandler, useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { SpinnerGap } from 'phosphor-react';
import { useChat } from 'src/contexts';

const Component: FC<{ isOpen: boolean, onClose: any }> = ({ isOpen, onClose }) => {

  const { createChannel } = useChat();
  const initialFocus = useRef(null);

  const [isLoading, setLoading] = useState(false);
  const [hasFailed, setFailed] = useState(false);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const onCreateChannel: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      await createChannel({ variables: { name, password: password.trim() } });
      onClose();
      setFailed(false);
    } catch (ex) {
      setFailed(true);
    } finally {
      setName('');
      setPassword('');
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

        <form onSubmit={onCreateChannel}
              className='relative bg-primary-600 border border-primary-400 rounded overflow-hidden shadow-xl'>

          <div className='flex flex-col text-center items-center py-8 px-4 space-y-4'>

            <Dialog.Title as='h3' className='text-lg font-semibold'>
              Create a new channel
            </Dialog.Title>

            <Dialog.Description as='p' className='text-sm'>
              Please provide the channel name, and eventually a password if you want to make the channel protected.
            </Dialog.Description>

            {hasFailed && (
              <p className='text-sm text-red-600'>
                A channel with this name already exists, please consider in using a different one.
              </p>
            )}

            <div className='space-y-2 w-full'>
              <input type='text' placeholder='Choose a name...'
                     value={name}
                     onChange={e => setName(e.target.value)}
                     className='bg-primary-400 w-full text-sm rounded px-2 py-1 outline-none border border-transparent focus:border-accent'
                     required />

              <input type='password' placeholder='Choose a password...'
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                     className='bg-primary-400 w-full text-sm rounded px-2 py-1 outline-none border border-transparent focus:border-accent' />
            </div>

          </div>

          {isLoading && (
            <div className='bg-primary-500 p-2.5 flex items-center justify-center'>
              <SpinnerGap className='animate-spin' size={24} weight='bold' />
            </div>
          )}

          {!isLoading && (
            <div className='bg-primary-500 p-2.5 flex flex-col space-y-2'>
              <button
                type='submit'
                className='bg-accent font-medium p-1.5 rounded'
                ref={initialFocus}>
                Confirm
              </button>
            </div>
          )}

        </form>

      </div>

    </Dialog>
  );
};

export default Component;