import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { createContext, useContext, useEffect, useState } from 'react';
import { ChatContextProps, FCWithChildren } from 'types';
import { ON_CHANNEL_UPDATE } from 'src/graphql/subscriptions';
import { CHANNELS } from 'src/graphql/queries';
import { Channel } from 'types/graphql';
import { JOIN_CHANNEL, SEND_MESSAGE } from 'src/graphql/mutations';

const ChatContext = createContext<ChatContextProps>({
  channels: [],
  joinChannel: undefined,
  sendMessage: undefined
});

export const ChatContextProvider: FCWithChildren = ({ children }) => {

  const query = useQuery(CHANNELS);
  const subscription = useSubscription(ON_CHANNEL_UPDATE);
  const [joinChannel] = useMutation(JOIN_CHANNEL);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {

    if (query.data) {
      setChannels([...query.data.channels]);
    }

    if (subscription.data) {
      const snapshot = subscription.data.channel;
      const index = channels.findIndex(x => x.id === snapshot.id);
      if (index < 0)
        channels.push(snapshot);
      else
        channels[index] = snapshot;

      setChannels([...channels]);
    }

  }, [query, subscription]);

  return (
    <ChatContext.Provider value={{ channels, joinChannel, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);