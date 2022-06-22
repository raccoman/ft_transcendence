import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';

const HTTP_LINK = new HttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT || 'undefined',
  credentials: 'include',
});

const WS_LINK = process.browser ? new GraphQLWsLink(createClient({
  url: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_WS_ENDPOINT || 'undefined',
})) : null;

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const ONDEMAND_LINK = process.browser ? split(({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  // @ts-ignore
  WS_LINK,
  HTTP_LINK,
) : null;

export const APOLLO_CLIENT = new ApolloClient({
  // @ts-ignore
  link: ONDEMAND_LINK,
  cache: new InMemoryCache(),
});
