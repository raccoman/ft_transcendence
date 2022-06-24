require('dotenv').config({ path: '../.env' });

const {
  NESTJS_BASE_URL: endpoint,
} = process.env;

const codeGenConfig = {
  generates: {
    'types/graphql.ts': {
      schema: [{
        [endpoint + '/graphql']: {},
      }],
      plugins: [
        'typescript',
      ],
    },
  },
};

module.exports = codeGenConfig;