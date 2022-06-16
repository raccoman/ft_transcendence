import { ReactElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = (page: ReactElement) => {

    const router = useRouter();

    return (

        <div className='min-h-screen flex flex-col bg-primary'>

            <div className='flex justify-between items-center py-2 px-5 border-b border-tertiary'>

                <div className='flex items-center space-x-10'>

                    <h1 className='font-semibold text-white text-2xl'>Transcendence</h1>

                    <div className='flex justify-evenly items-center space-x-2'>

                        <Link href='/' passHref>
	    		        	<a className={`px-3 py-2 font-medium text-white ${router.pathname == '/' ? 'border-b border-accent' : 'hover:border-b hover:border-accent'}`}>
	    		        		Play
	    		        	</a>
	    		        </Link>

                        <Link href='/chat' passHref>
	    		        	<a className={`px-3 py-2 font-medium text-white ${router.pathname == '/chat' ? 'border-b border-accent' : 'hover:border-b hover:border-accent'}`}>
	    		        		Chat
	    		        	</a>
	    		        </Link>

                        <Link href='/leaderboards' passHref>
	    		        	<a className={`px-3 py-2 font-medium text-white ${router.pathname == '/leaderboards' ? 'border-b border-accent' : 'hover:border-b hover:border-accent'}`}>
                                Leaderboards
                            </a>
	    		        </Link>

                    </div>

                </div>

                <Link href='/profile'>
                    <img className="h-12 w-12 rounded-full border-2 border-accent"
                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                </Link>

            </div>

            {page}

        </div>

    );

};

export default Layout;