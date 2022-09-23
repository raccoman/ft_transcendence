import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { createContext, useContext, useEffect, useState } from 'react';
import { ChatContextProps, FCWithChildren } from 'types';
import { Channel } from 'types/graphql';
import { UPSERT_PUNISHMENT, JOIN_CHANNEL, SEND_MESSAGE, CREATE_CHANNEL, LEAVE_CHANNEL } from 'src/graphql/mutations';
import { ON_CHANNEL_UPDATE } from 'src/graphql/subscriptions';
import { CHANNELS } from 'src/graphql/queries';

const ChatContext = createContext<ChatContextProps>({
  channels: [],
  createChannel: undefined,
  leaveChannel: undefined,
  joinChannel: undefined,
  sendMessage: undefined,
  upsertPunishment: undefined,
});

export const ChatContextProvider: FCWithChildren = ({ children }) => {

  const query = useQuery(CHANNELS);
  const subscription = useSubscription(ON_CHANNEL_UPDATE);

  const [createChannel] = useMutation(CREATE_CHANNEL);
  const [leaveChannel] = useMutation(LEAVE_CHANNEL);
  const [joinChannel] = useMutation(JOIN_CHANNEL);
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [upsertPunishment] = useMutation(UPSERT_PUNISHMENT);

  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {

    if (query.data) {
      setChannels([...query.data.channels]);
    }

    if (subscription.data) {
      query.refetch();
    }

  }, [query, subscription]);

  return (
    <ChatContext.Provider value={{ channels, createChannel, leaveChannel, joinChannel, sendMessage, upsertPunishment }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);