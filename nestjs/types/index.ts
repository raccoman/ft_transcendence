import { Socket } from 'socket.io';
import { Profile } from 'types/graphql';

export interface QueuedProfile {
  socket: Socket;
  profile: Profile;
}

export interface MatchProfile {
  profile: Profile;
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
    started_at: number;
    elapsed: number;
    countdown: number;
  };
}