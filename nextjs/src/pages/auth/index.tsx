import Head from 'next/head'
import Image from 'next/image'
import { EmptyLayout } from 'src/layouts'
import { NextPageWithLayout } from 'types'

const Index: NextPageWithLayout = () => {
  return (
    <div className='min-h-screen h-full flex flex-col justify-center items-center bg-[url("/assets/auth.webm")] bg-cover'>

      <div className='rounded-xl bg-white shadow-lg p-5 flex flex-col items-center space-y-10'>

        <div className='flex flex-col items-center space-y-1'>
          <h1 className='font-semibold text-2xl'>Welcome to Transcendence</h1>
          <p>To get started log in to your account</p>
        </div>

        <button className='w-full p-2 rounded-xl bg-green-400 font-medium'>
          Sign in with 42
        </button>

      </div>

    </div>
  )
}

Index.getLayout = EmptyLayout;
Index.isPublicRoute = true;
export default Index