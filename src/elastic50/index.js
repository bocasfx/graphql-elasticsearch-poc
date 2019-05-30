/* eslint-disable no-console */

import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import schema from './schema';
import { graphQLPort } from '../config';

const server = express();
server.use(cors());
server.use(
  '/',
  graphqlHTTP({
    schema,
    graphiql: true,
    customFormatErrorFn: error => ({
      message: error.message,
      stack: error.stack.split('\n'),
    }),
  }),
);

server.listen(graphQLPort, () => {
  console.log(`The server is running at http://localhost:${graphQLPort}/`);
});
