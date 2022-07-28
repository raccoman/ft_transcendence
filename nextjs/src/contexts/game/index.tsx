import { FCWithChildren, GameContextProps, Match, MatchProfile, MatchType } from 'types';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';
import { of } from 'rxjs';
import { set } from 'js-cookie';

export const CANVAS_WIDTH = 1024;
export const CANVAS_HEIGHT = 576;
export const CANVAS_PADDING_X = 20;

export const PADDLE_HEIGHT = 192;
export const PADDLE_WIDTH = 20;
export const PADDLE_SPEED_Y = 10;

const GameContext = createContext<GameContextProps>({
  queued: false,
  joinQueue: undefined,
  leaveQueue: undefined,
  match: undefined,
  onKeyDown: undefined,
  onKeyUp: undefined,
  runTick: undefined,
});

const socket = io(process.env.NEXT_PUBLIC_WS_ENDPOINT!!, { withCredentials: true });

export const GameContextProvider: FCWithChildren = ({ children }) => {

  const router = useRouter();

  const [queued, setQueued] = useState(false);
  const [match, setMatch] = useState<Match | undefined>(undefined);
  const [input, setInput] = useState<MatchProfile['input']>({ up: false, down: false });

  const joinQueue = (type: MatchType) => {
    socket.emit('JOIN-QUEUE', { type }, (error: string) => setQueued(!error));
  };
  const leaveQueue = () => {
    socket.emit('LEAVE-QUEUE', {}, () => setQueued(false));
  };

  const onKeyUp = (e: KeyboardEvent) => {
    if (!match || e.repeat)
      return;

    if (e.key == 'ArrowDown') {
      setInput(input => {
        input.down = false;
        socket.emit('PLAYER-INPUT', { id: match.id, input });
        return input;
      });
    }

    if (e.key == 'ArrowUp') {
      setInput(input => {
        input.up = false;
        socket.emit('PLAYER-INPUT', { id: match.id, input });
        return input;
      });
    }
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (!match || e.repeat)
      return;

    if (e.key === 'ArrowDown') {
      setInput(input => {
        input.down = true;
        socket.emit('PLAYER-INPUT', { id: match.id, input });
        return input;
      });
    }

    if (e.key === 'ArrowUp') {
      setInput(input => {
        input.up = true;
        socket.emit('PLAYER-INPUT', { id: match.id, input });
        return input;
      });
    }
  };

  const runTick = (delta: number) => {

    setMatch((match: Match | undefined) => {

      if (!match)
        return match;

      for (const player of match.players) {
        const direction = +player.input.down - +player.input.up;

        player.paddle.posY = Math.floor(player.paddle.posY + (player.paddle.speedY * direction * delta));
        player.paddle.posY = Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, player.paddle.posY);
        player.paddle.posY = Math.max(0, player.paddle.posY);
      }

      return match;
    });

  };

  useEffect(() => {

    socket.on('connect', () => {
      console.log('Successfully connected websocket.');
    });

    socket.on('connect_error', (error) => {
      console.error(error);
    });


    socket.on('disconnect', (reason) => {
      console.debug(reason);
    });

    socket.on('MATCH-FOUND', async (data) => {
      setQueued(false);
      setMatch(data);
      await router.push('/match/' + data.id);
    });

    socket.on('MATCH-UPDATE', (data) => {
      setMatch(data);
    });

    console.log('Connecting websocket...');
    socket.connect();

    return () => {
      if (!socket)
        return;

      console.debug('Successfully disconnected websocket.');
      socket.disconnect();
    };

  }, []);

  return (
    <GameContext.Provider value={{ queued, joinQueue, leaveQueue, match, onKeyDown, onKeyUp, runTick }}>
      {children}
    </GameContext.Provider>
  );

};

export const useGame = () => useContext(GameContext);