import { FC, useEffect, useRef } from 'react';
import { Channel } from 'types/graphql';
import { LockKeyOpen, X } from 'phosphor-react';

export const JoinableChat: FC<{
    channel: Channel
    onJoin: (password: string | undefined) => void
    onClose: () => void
}> = ({ channel, onJoin, onClose }) => {

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className='flex flex-col justify-between border border-primary-400 rounded-tr-md rounded-tl-md w-[300px]'>

            <div className='flex flex-col space-y-1 px-5 py-2'>

                <div className='flex justify-between items-center'>
                    <p className='font-medium align-middle'>{channel.name}</p>
                    <button className='rounded-full p-1.5 hover:bg-secondary/10' onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                <div className='h-[1px] bg-primary-400 w-full' />

                <div className='grid grid-cols-1 gap-2 p-2 overflow-hidden max-h-[200px]'>
                    {Array.from(Array(5).keys()).map((n, index) => {

                        const random = n % 3 == 0;

                        return (
                            <div key={index} className='grid grid-cols-3 animate-pulse'>

                                {random && (<div className='col-span-1' />)}
                                <div
                                    className={`${random ? 'rounded-bl-none' : 'rounded-br-none'} col-span-2 flex flex-col bg-primary-400 rounded-lg px-2 py-2 space-y-2`}>
                                    <div className='h-2 bg-primary-500 rounded' />
                                    <div className='grid grid-cols-3 gap-4'>
                                        <div className={`${random ? 'col-span-2' : 'col-span-1'} h-2 bg-primary-500 rounded`} />
                                        <div className={`${random ? 'col-span-1' : 'col-span-2'} h-2 bg-primary-500 rounded`} />
                                    </div>
                                </div>
                                {random && (<div className='col-span-1' />)}

                            </div>
                        )
                    })}
                </div>

            </div>


            {channel.type === 'PROTECTED' && (
                <form onSubmit={(e) => {

                    e.preventDefault();

                    if (!inputRef.current)
                        return;

                    onJoin(inputRef.current.value ?? '');
                    inputRef.current.value = '';

                }} className='bg-primary-500 p-2.5 flex space-x-2.5 items-center'>
                    <input ref={inputRef} type='text' placeholder='Enter the passsword...'
                        className='bg-primary-400 w-full text-sm rounded-md px-2 py-1 outline-none border border-transparent focus:border-accent'
                        required />
                    <button type='submit'>
                        <LockKeyOpen size={24} weight='duotone' className='text-accent' />
                    </button>
                </form>
            )}

            {channel.type === 'PUBLIC' && (
                <div className='bg-primary-500 p-2.5'>
                    <button className='w-full py-1.5 bg-accent rounded-md font-medium text-sm' onClick={() => onJoin(undefined)}>
                        Join channel
                    </button>
                </div>
            )}

        </div>
    );
};