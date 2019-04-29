import { GraphQLServer } from 'graphql-yoga';
import * as path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: resolvers,
});

server.start(() => console.log("GraphQL Server Running"));
