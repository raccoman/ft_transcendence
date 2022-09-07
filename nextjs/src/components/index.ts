import dynamic from 'next/dynamic';

export { default as AuthGuard } from './authguard';
export { default as Navbar } from './navbar';
export { default as GameChat } from './chat';
export { default as GameBanner } from './game/banner';
export { default as ProfileStatus } from './profile/status';
export const GameCanvas = dynamic(() => import('src/components/game/canvas'), { ssr: false });