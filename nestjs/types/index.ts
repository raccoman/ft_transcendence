import { Socket } from 'socket.io';
import { Profile } from 'types/graphql';

export interface QueuedProfile {
  socket: Socket;
  profile: Profile;
}

export interface MatchProfile {
  profile: Profile;
  background: string; //TODO: move in profile
  lives: number;
  input: {
    down: boolean,
    up: boolean,
  };
  position: number;
}

export enum MatchType {
  DRAFT_2vs2,
  DRAFT_4vs4,
  RANKED_2vs2,
  RANKED_4vs4,
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