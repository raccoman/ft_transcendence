import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';

const PROCESS_BROWSER = () => typeof window !== 'undefined';

const HTTP_LINK = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  credentials: 'include',
});

const WS_LINK = PROCESS_BROWSER() ? new GraphQLWsLink(createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT!!,
})) : null;

const ONDEMAND_LINK = PROCESS_BROWSER() ? split(({ query }) => {
    const definition = getMainDefinition(query);
    return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription');
  },
  // @ts-ignore
  WS_LINK,
  HTTP_LINK,
) : null;

export const APOLLO_CLIENT = new ApolloClient({
  //@ts-ignore
  link: ONDEMAND_LINK,
  cache: new InMemoryCache(),
});