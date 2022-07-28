import type { FC, ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Channel, Profile } from 'types/graphql';
import { Socket } from 'net';

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
  profile: Profile | undefined;
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
}

export interface MatchProfile {
  profile: Profile;
  background: string; //TODO: move in profile
  lives: number;
  input: {
    down: boolean,
    up: boolean,
  };
  paddle: {
    posY: number;
    posX: number;
    speedX: number;
    speedY: number;
  };
}

export enum MatchType {
  DRAFT_1vs1,
  RANKED_1vs1,
}

export enum MatchState {
  STARTING,
  RUNNING,
  ENDING
}

export interface Match {
  id: string;
  players: MatchProfile[];
  spectators: Profile[];
  settings: {
    type: MatchType;
    lives: number;
  };
  state: MatchState;
  timings: {
    started_at: number;
    elapsed: number;
  };
}