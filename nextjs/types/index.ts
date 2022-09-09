import type { ChangeEventHandler, FC, ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Background, Channel, MeResponse, Profile } from 'types/graphql';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  isPublicRoute?: boolean;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type FCWithChildren<V = {}> = FC<{ children?: ReactNode } & V>

export interface SessionContextProps {
  signIn: (() => void) | undefined;
  isLoading: boolean;
  profile: MeResponse | undefined;
  uploadAvatar: ChangeEventHandler<HTMLInputElement> | undefined;
  equipBackground: ((id: string | undefined) => any) | undefined;
  twoFactorAuth: {
    refreshSecret: any;
    enable: any;
    disable: any;
    authenticate: any;
  };
}

export interface ChatContextProps {
  channels: Channel[];
  createChannel: any;
  leaveChannel: any;
  joinChannel: any;
  sendMessage: any;
  upsertPunishment: any;
}

export interface GameContextProps {
  queued: boolean;
  joinQueue: any;
  leaveQueue: any;
  match: Match | undefined;
  onKeyDown: any;
  onKeyUp: any;
  runTick: any;
  fps: number;
}

export interface MatchProfile {

  profile: Partial<Profile>;
  background: string;

  lives: number;
  input: { [key: string]: boolean };

  paddle: {
    posY: number;
    posX: number;
    speedX: number;
    speedY: number;
    renderPosX: number;
    renderPosY: number;
  };

}

export enum MatchType {
  DRAFT_1vs1,
  RANKED_1vs1,
  CUSTOM_1vs1,
}

export enum MatchState {
  STARTING,
  RUNNING,
  ENDING
}

export interface Match {
  id: string;
  players: MatchProfile[];
  ball: {
    radius: number;
    posY: number;
    posX: number;
    speedX: number;
    speedY: number;
    acceleration: number;
    renderPosX: number;
    renderPosY: number;
  };
  settings: {
    type: MatchType;
    lives: number;
  };
  state: MatchState;
  timings: {
    started_at: Date;
    elapsed: number;
    countdown: number;
  };
}

export type Ball = Match['ball'];
export type Paddle = MatchProfile['paddle'];
export type Partial<T> = { [P in keyof T]?: T[P]; };