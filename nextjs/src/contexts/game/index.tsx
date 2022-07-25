import { FCWithChildren, GameContextProps } from 'types';
import { createContext, useEffect, useState } from 'react';
import { Profile } from 'types/graphql';
import { io } from 'socket.io-client';

const GameContext = createContext<GameContextProps>({
  inQueue: false,
});

export const GameContextProvider: FCWithChildren = ({ children }) => {

  const [socket, setSocket] = useState(io(process.env.NEXT_PUBLIC_WS_ENDPOINT!!, { withCredentials: true }));
  const [inQueue, setInQueue] = useState(false);

  const joinQueue = (mode: 'RANKED' | 'UNRANKED') => {
    socket.emit('JOIN-QUEUE', { mode });
  };

  useEffect(() => {

    socket.on('connect_error', () => {
      setTimeout(() => {
        socket.connect();
      }, 5000);
    });

    socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect' || reason === 'io client disconnect') {
        setTimeout(() => {
          socket.connect();
        }, 5000);
      }
    });

    // socket.connect();

    return () => {

      if (!socket)
        return;

      socket.close();
    };

  }, []);

  return (
    <GameContext.Provider value={{ inQueue }}>
      {children}
    </GameContext.Provider>
  );

};