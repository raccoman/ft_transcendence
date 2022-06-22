// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '../.env' });

const {
  HASURA_GRAPHQL_ENDPOINT: endpoint, HASURA_GRAPHQL_ADMIN_SECRET: secret,
} = process.env;

const codeGenConfig = {
  generates: {
    'types/hasura.ts': {
      documents: ['src/**/*.service.ts'],
      schema: [{
        [endpoint]: {
          headers: {
            'x-hasura-admin-secret': secret,
          },
        },
      }],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        gqlImport: 'graphql-request#gql',
        avoidOptionals: {
          object: true,
          field: true,
          inputValue: false,
        },
      },
    },
  },
};

module.exports = codeGenConfig;