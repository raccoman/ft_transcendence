import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { createContext, useContext, useEffect, useState } from 'react';
import { ChatContextProps, FCWithChildren } from 'types';
import { ON_CHANNEL_UPDATE } from 'src/graphql/subscriptions';
import { CHANNELS } from 'src/graphql/queries';
import { Channel } from 'types/graphql';
import { UPSERT_PUNISHMENT, JOIN_CHANNEL, SEND_MESSAGE, CREATE_CHANNEL, DELETE_CHANNEL } from 'src/graphql/mutations';

const ChatContext = createContext<ChatContextProps>({
  channels: [],
  createChannel: undefined,
  deleteChannel: undefined,
  joinChannel: undefined,
  sendMessage: undefined,
  upsertPunishment: undefined,
});

export const ChatContextProvider: FCWithChildren = ({ children }) => {

  const query = useQuery(CHANNELS);
  const subscription = useSubscription(ON_CHANNEL_UPDATE);

  const [createChannel] = useMutation(CREATE_CHANNEL);
  const [deleteChannel] = useMutation(DELETE_CHANNEL);
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
      // const snapshot = subscription.data.channel;
      // const index = channels.findIndex(x => x.id === snapshot.id);
      // if (index < 0)
      //   channels.push(snapshot);
      // else
      //   channels[index] = snapshot;
      //
      // setChannels([...channels]);
    }

  }, [query, subscription]);

  return (
    <ChatContext.Provider value={{ channels, createChannel, deleteChannel, joinChannel, sendMessage, upsertPunishment }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);