import * as path from 'path';
import { GraphQLServer } from 'graphql-yoga';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import authMiddleware from './middlewares/authMiddleware';

const {
  PORT = 4000,
  DEBUG = 'false',
  JWT_SECRET = 'undefined',
} = process.env;

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  middlewares: [authMiddleware(JWT_SECRET)],
  context: (req) => ({
    ...req,
  }),
  resolvers: resolvers,
});

server.start(() => console.log('GraphQL Server Running'));
