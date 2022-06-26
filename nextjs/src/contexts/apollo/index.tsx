import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';

const HTTP_LINK = new HttpLink({
  uri: process.env.NEXT_PUBLIC_NESTJS_BASE_URL + '/graphql' || 'undefined',
  credentials: 'include',
});

const WS_LINK = process.browser ? new GraphQLWsLink(createClient({
  url: process.env.NEXT_PUBLIC_NESTJS_WS_BASE_URL + '/graphql' || 'undefined',
})) : null;

const ONDEMAND_LINK = process.browser ? split(({ query }) => {
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