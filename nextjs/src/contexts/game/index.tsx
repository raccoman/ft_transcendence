import { FCWithChildren, GameContextProps, Match, MatchType } from 'types';
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';
import { useSession } from 'src/contexts/session';
import { OnGoingMatch } from 'types';

export const CANVAS_WIDTH = 1024;
export const CANVAS_HEIGHT = 576;

export const PADDLE_HEIGHT = 192;
export const PADDLE_WIDTH = 20;

const GameContext = createContext<GameContextProps>({
  inQueue: false,
  joinQueue: undefined,
  leaveQueue: undefined,
  match: undefined,
  onKeyDown: undefined,
  onKeyUp: undefined,
  runTick: undefined,
  fps: 0,
  onGoingMatches: [],
  spectateMatch: undefined,
  leaveMatch: undefined,
});

const socket = io(process.env.NEXT_PUBLIC_HTTP_WS_ENDPOINT!!, { withCredentials: true });

export const GameContextProvider: FCWithChildren = ({ children }) => {

  const router = useRouter();
  const { profile } = useSession();

  const [inQueue, setInQueue] = useState(false);
  const [match, setMatch] = useState<Match | undefined>(undefined);
  const [onGoingMatches, setOnGoingMatches] = useState<OnGoingMatch[]>([]);

  const [fps, setFps] = useState(0);

  const joinQueue = (type: MatchType) => {
    socket.emit('JOIN-QUEUE', { type }, () => setInQueue(true));
  };

  const leaveQueue = () => {
    socket.emit('LEAVE-QUEUE', {}, () => setInQueue(false));
  };

  const spectateMatch = (id: string) => {
    socket.emit('SPECTATE-MATCH', { id });
  };

  const leaveMatch = () => {
    socket.emit('LEAVE-MATCH', {});
  };

  const onKeyUp = (e: KeyboardEvent) => {

    e.preventDefault();

    if (!match || e.repeat || match.spectators.findIndex(x => x.id == profile?.id) >= 0)
      return;

    if (e.key != 'ArrowDown' && e.key != 'ArrowUp')
      return;

    socket.emit('MOVE-PADDLE', { match_id: match.id, key: e.key, pressed: false });
  };

  const onKeyDown = (e: KeyboardEvent) => {

    e.preventDefault();

    if (!match || e.repeat || match.spectators.findIndex(x => x.id == profile?.id) >= 0)
      return;

    if (e.key != 'ArrowDown' && e.key != 'ArrowUp')
      return;

    socket.emit('MOVE-PADDLE', { match_id: match.id, key: e.key, pressed: true });
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
      console.debug('Successfully connected websocket.');
    });

    socket.on('connect_error', (error) => {
      console.error(error);
    });

    socket.on('disconnect', (reason) => {
      console.debug(reason);
    });

    socket.on('ONGOING-MATCHES', async (data) => {
      setOnGoingMatches([...data]);
    });

    socket.on('MATCH-FOUND', async (data) => {
      setInQueue(false);
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

    socket.connect();
    socket.emit('AUTHENTICATE', {});

    return () => {
      if (!socket)
        return;

      console.debug('Successfully disconnected websocket.');
      socket.disconnect();
    };

  }, []);

  return (
    <GameContext.Provider
      value={{
        inQueue,
        joinQueue,
        leaveQueue,
        match,
        onKeyDown,
        onKeyUp,
        runTick,
        fps,
        onGoingMatches,
        spectateMatch,
        leaveMatch,
      }}>
      {children}
    </GameContext.Provider>
  );

};

export const useGame = () => useContext(GameContext);