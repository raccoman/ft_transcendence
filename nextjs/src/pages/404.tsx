import { NextPage } from 'next';

const _404: NextPage = () => {
  return (
    <div className='h-full px-5 py-2 flex items-center justify-center'>

      <div className='flex divide-x space-x-5'>
        <h1 className='text-accent font-bold text-5xl'>404</h1>
        <div className='flex flex-col pl-5 space-y-2'>
          <h1 className='font-bold text-5xl'>Page Not Found</h1>
          <p className='text-md text-gray-500'>Please check the URL in the address bar and try again.</p>
        </div>
      </div>

    </div>
  );
};

export default _404;
