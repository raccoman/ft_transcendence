import { FCWithChildren, GameContextProps } from 'types';
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const GameContext = createContext<GameContextProps>({
  inQueue: false,
  joinQueue: undefined,
});

export const GameContextProvider: FCWithChildren = ({ children }) => {

  const [socket, setSocket] = useState(io(
    process.env.NEXT_PUBLIC_WS_ENDPOINT!!, {
      withCredentials: true,
    },
  ));

  const [inQueue, setInQueue] = useState(false);

  const joinQueue = (mode: 'RANKED' | 'UNRANKED') => {
    socket.emit('JOIN-QUEUE', { mode }, (data: any) => console.log(data));
  };

  useEffect(() => {

    socket.on('connect', () => {
      console.log('WS connected');
    });

    socket.on('connect_error', (err) => {
      console.error(err);
    });

    socket.on('disconnect', (reason) => {
      console.error(reason);
      // if (reason === 'io server disconnect') {
      //   setTimeout(() => {
      //     socket.connect();
      //   }, 5000);
      // }
    });

    socket.connect();

    return () => {
      if (!socket)
        return;

      socket.disconnect();
    };

  }, []);

  return (
    <GameContext.Provider value={{ inQueue, joinQueue }}>
      {children}
    </GameContext.Provider>
  );

};

export const useGame = () => useContext(GameContext);