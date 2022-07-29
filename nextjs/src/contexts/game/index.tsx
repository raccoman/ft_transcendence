import { FCWithChildren, GameContextProps, Match, MatchProfile, MatchType } from 'types';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';
import { of } from 'rxjs';
import { set } from 'js-cookie';
import { useSession } from 'src/contexts/session';

export const CANVAS_WIDTH = 1024;
export const CANVAS_HEIGHT = 576;

export const PADDLE_HEIGHT = 192;
export const PADDLE_WIDTH = 20;

const GameContext = createContext<GameContextProps>({
  queued: false,
  joinQueue: undefined,
  leaveQueue: undefined,
  match: undefined,
  onKeyDown: undefined,
  onKeyUp: undefined,
  runTick: undefined,
  frameRate: 0,
});

const socket = io(process.env.NEXT_PUBLIC_WS_ENDPOINT!!, { withCredentials: true });

export const GameContextProvider: FCWithChildren = ({ children }) => {

  const router = useRouter();

  const [queued, setQueued] = useState(false);
  const [match, setMatch] = useState<Match | undefined>(undefined);
  const [frameRate, setFrameRate] = useState(0);

  const joinQueue = (type: MatchType) => {
    socket.emit('JOIN-QUEUE', { type }, (error: string) => setQueued(!error));
  };
  const leaveQueue = () => {
    socket.emit('LEAVE-QUEUE', {}, () => setQueued(false));
  };

  const onKeyUp = (e: KeyboardEvent) => {
    if (!match || e.repeat)
      return;

    if (e.key != 'ArrowDown' && e.key != 'ArrowUp')
      return;

    socket.emit('PLAYER-INPUT', { match: match.id, key: e.key, pressed: false });
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (!match || e.repeat)
      return;

    if (e.key != 'ArrowDown' && e.key != 'ArrowUp')
      return;

    socket.emit('PLAYER-INPUT', { match: match.id, key: e.key, pressed: true });
  };

  const runTick = (delta: number) => {

    setFrameRate(delta);

    setMatch((match: Match | undefined) => {

      if (!match)
        return match;

      for (const player of match.players) {

        const dirY = +player.input['ArrowDown'] - +player.input['ArrowUp'];

        player.paddle.posY += player.paddle.speedY * dirY * delta;
        player.paddle.posY = Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, player.paddle.posY);
        player.paddle.posY = Math.max(0, player.paddle.posY);
      }

      match.ball.posX += match.ball.speedX * delta;
      match.ball.posY += match.ball.speedY * delta;

      if (match.ball.posY + match.ball.radius > CANVAS_HEIGHT ||
        match.ball.posY - match.ball.radius < 0) {
        match.ball.speedY += match.ball.acceleration * delta;
        match.ball.speedY *= -1;
      }

      if (match.ball.posX + match.ball.radius > CANVAS_WIDTH ||
        match.ball.posX - match.ball.radius < 0) {
        match.ball.speedX += match.ball.acceleration * delta;
        match.ball.speedX *= -1;
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
    <GameContext.Provider
      value={{ queued, joinQueue, leaveQueue, match, onKeyDown, onKeyUp, runTick, frameRate }}>
      {children}
    </GameContext.Provider>
  );

};

export const useGame = () => useContext(GameContext);