import { FCWithChildren, GameContextProps, Match, MatchProfile, MatchType } from 'types';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';

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
  fps: 0,
});

const socket = io(process.env.NEXT_PUBLIC_WS_ENDPOINT!!, { withCredentials: true });

export const GameContextProvider: FCWithChildren = ({ children }) => {

  const router = useRouter();

  const [queued, setQueued] = useState(false);
  const [match, setMatch] = useState<Match | undefined>(undefined);

  const [fps, setFps] = useState(0);

  // const BALL_HIT_WALL_SOUND = new Audio('public/assets/sounds/ball-hit-wall.mp3');
  // const BALL_HIT_PADDLE_SOUND = new Audio('public/assets/sounds/ball-hit-paddle.mp3');

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

  const runTick = (elapsed: number) => {

    const partialTicks = elapsed / 50;
    setFps(prevState => (prevState + 1));
    setTimeout(() => setFps(prevState => prevState - 1), 1000);

    setMatch((match: Match | undefined) => {

      if (!match)
        return match;

      for (const player of match.players) {

        const dirY = +player.input['ArrowDown'] - +player.input['ArrowUp'];
        const dirX = +player.input['ArrowRight'] - +player.input['ArrowLeft'];

        player.paddle.renderPosX = player.paddle.posX * player.paddle.speedX * dirX * partialTicks;
        player.paddle.renderPosY = player.paddle.posY * player.paddle.speedY * dirY * partialTicks;
      }

      match.ball.renderPosX = match.ball.posX + match.ball.speedX * partialTicks;
      match.ball.renderPosY = match.ball.posY + match.ball.speedY * partialTicks;

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
      await setMatch(() => data);
      await router.push('/match/' + data.id);
    });

    socket.on('MATCH-UPDATE', (match) => {
      setMatch(prevState => {

        if (!prevState)
          return match;

        for (let i = 0; i < prevState.players.length; i++) {
          match.players[i].paddle.renderPosX = prevState.players[i].paddle.renderPosX;
          match.players[i].paddle.renderPosY = prevState.players[i].paddle.renderPosY;
        }

        match.ball.renderPosX = prevState.ball.renderPosX;
        match.ball.renderPosY = prevState.ball.renderPosY;
        return match;
      });
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
      value={{ queued, joinQueue, leaveQueue, match, onKeyDown, onKeyUp, runTick, fps }}>
      {children}
    </GameContext.Provider>
  );

};

export const useGame = () => useContext(GameContext);