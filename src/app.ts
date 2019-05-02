import * as path from 'path';
import models from './models';
import { GraphQLServer, Options } from 'graphql-yoga';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import authMiddleware from './middlewares/authMiddleware';
import { Http2Server } from 'http2';

const {
  PORT = 4000,
  JWT_SECRET = 'undefined',
} = process.env;

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

async function startServer(): Promise<Http2Server> {
  let app = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    middlewares: [authMiddleware(JWT_SECRET)],
    context: (req) => {
      return {
        ...req,
        models,
      };
  },
    resolvers: resolvers,
  });

  // server.use('/health', healthController);
  // server.use('/version', versionController);

  const options: Options = {
    endpoint: '/graphql',
    playground: '/playground',
    port: PORT,
    debug: !!process.env.DEBUG,
  };

  const server: Http2Server = await app.start(options, ({ port }) =>
    console.log(
      `Server started, listening on port ${port} for incoming requests.`,
    ),
  );

  return server;
};

export {
  startServer,
};
