import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4'
import { readFile } from 'fs/promises';

import { getUser } from './db/users.js';
import { resolvers } from './resolvers.js';
import { authMiddleware, handleLogin } from './auth.js';
import { createCompanyLoader } from './db/companies.js';

const PORT = process.env.APP_PORT || 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post('/login', handleLogin);

const server = new ApolloServer({
  typeDefs: await readFile('./schema.graphql', 'utf8'),
  resolvers
});

await server.start();

const getContext = async ({ req }) => {
  const context = {
    companyLoader: createCompanyLoader()
  };
  
  if (req.auth) {
    context.user = await getUser(req.auth.sub);
  }
  
  return context;
};

app.use('/graphql', apolloMiddleware(server, { 
  context: getContext
}));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
