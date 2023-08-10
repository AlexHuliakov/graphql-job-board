import { resolvers } from './resolvers';
import fs from 'fs';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer({ port: process.env.APP_PORT, server });
