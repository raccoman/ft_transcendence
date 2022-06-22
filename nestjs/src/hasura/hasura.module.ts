import { Inject, Module } from '@nestjs/common';
import { GraphQLRequestModule, GraphQLClientInject } from '@golevelup/nestjs-graphql-request';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from 'types/hasura';

const PROVIDER_TOKEN = 'HASURA';
export const InjectHasura = () => Inject(PROVIDER_TOKEN);

@Module({
  imports: [
    GraphQLRequestModule.forRootAsync(GraphQLRequestModule, {
      useFactory: () => {
        return {
          endpoint: process.env.HASURA_GRAPHQL_ENDPOINT,
          options: {
            headers: {
              'content-type': 'application/json',
              'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
            },
          },
        };
      },
    }),
  ],
  providers: [
    {
      provide: PROVIDER_TOKEN,
      inject: [GraphQLClientInject],
      useFactory: (client: GraphQLClient) => getSdk(client),
    },
  ],
  exports: [PROVIDER_TOKEN],
})
export class HasuraModule {
}
