require('dotenv').config({ path: '../.env.production' });

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