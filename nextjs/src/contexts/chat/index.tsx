import { createContext, useContext, useEffect, useState } from 'react';
import { ChatContextProps, FCWithChildren } from 'types';
import { useSubscription } from '@apollo/client';
import { subscription_channels } from 'src/graphql/subscriptions';
import { Channels } from 'types/hasura';

const ChatContext = createContext<ChatContextProps>({
  channels: [],
});

export const ChatContextProvider: FCWithChildren = ({ children }) => {

  const { data } = useSubscription(subscription_channels);

  const [channels, setChannels] = useState<Channels[]>([]);

  useEffect(() => {

    if (!data || !data.channels)
      return;

    setChannels([...data.channels]);
  }, [data]);

  return (
    <ChatContext.Provider value={{ channels }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);