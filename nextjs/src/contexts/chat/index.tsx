import { createContext, useContext, useEffect, useState } from 'react';
import { ChatContextProps, FCWithChildren } from 'types';

const ChatContext = createContext<ChatContextProps>({
  channels: [],
});

export const ChatContextProvider: FCWithChildren = ({ children }) => {

  //const { data } = useSubscription(subscription_channels);

  const [channels, setChannels] = useState<any[]>([]);

  // useEffect(() => {
  //
  //   if (!data || !data.channels)
  //     return;
  //
  //   setChannels([...data.channels]);
  // }, [data]);

  return (
    <ChatContext.Provider value={{ channels }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);