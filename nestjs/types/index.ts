import { Server, Socket } from 'socket.io';
import { Profile } from 'types/graphql';

export interface QueuedProfile {
  socket: Socket;
  profile: Partial<Profile>;
}

export interface MatchmakingEnqueueInput {
  socket: Socket;
  profile: Partial<Profile>;
  type: MatchType;
}

export interface MatchmakingDequeueInput {
  socket: Socket;
  id: number;
}

export type GameDisconnectInput = MatchmakingDequeueInput;

export interface GameMoveInput {
  socket: Socket,
  profile: Partial<Profile>
  match_id: string;
  key: string;
  pressed: boolean;
}

export interface GameStartInput {
  server: Server;
  type: MatchType;
  challengers: QueuedProfile[];
}

export interface GameStateInput {
  match: Match;
  partialTicks: number;
  partialSeconds: number;
}

export interface MatchProfile {

  socket: Socket;
  profile: Partial<Profile>;
  background: string;

  lives: number;
  input: { [key: string]: boolean };

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