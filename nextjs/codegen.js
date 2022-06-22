require('dotenv').config({ path: '../.env' });

const {
  HASURA_GRAPHQL_ENDPOINT: endpoint, HASURA_GRAPHQL_ADMIN_SECRET: secret,
} = process.env;

const codeGenConfig = {
  generates: {
    'types/hasura.ts': {
      schema: [{
        [endpoint]: {
          headers: {
            'x-hasura-admin-secret': secret,
          },
        },
      }],
      plugins: [
        'typescript',
      ],
    },
  },
};

module.exports = codeGenConfig;