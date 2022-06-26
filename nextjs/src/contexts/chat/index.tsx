import { useSubscription } from '@apollo/client';
import { createContext, useContext, useEffect, useState } from 'react';
import { ChatContextProps, FCWithChildren } from 'types';
import { ON_CHANNEL_UPDATE } from 'src/graphql/subscriptions';

const ChatContext = createContext<ChatContextProps>({
  channels: [],
});

export const ChatContextProvider: FCWithChildren = ({ children }) => {

  const { data } = useSubscription(ON_CHANNEL_UPDATE);

  const [channels, setChannels] = useState<any[]>([]);

  useEffect(() => {
    console.log(JSON.stringify(data));
  }, [data]);

  return (
    <ChatContext.Provider value={{ channels }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);