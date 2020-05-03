import models, { ModelType } from './models';

import { ExpressContext } from 'apollo-server-express/src/ApolloServer';
import { JwtUser } from './utils/auth';
import { PubSub } from 'graphql-subscriptions';
import { Request } from 'apollo-server';
import { User } from './models/User';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export interface MyContext {
  getUser: () => Promise<User>;
  models: ModelType;
  pubsub: PubSub;
  appSecret: string;
}

const pubsub = new PubSub();

// eslint-disable-next-line
export const getToken = (req: Express.Request & any): string => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return null;
  }

  return authHeader.replace('Bearer ', '');
};

export const verifyUser = (token: string): JwtUser => {
  return jwt.verify(token, JWT_SECRET) as JwtUser;
};

export function createContext(ctx: ExpressContext): MyContext {
  const request = ctx.req;

  return {
    getUser: (): Promise<User> => {
      const { User: userModel } = models;
      const token = getToken(request);

      if (!token) {
        return null;
      }

      const user = verifyUser(token);
      const { userId } = user;

      return userModel.findOne({
        where: {
          id: userId,
        },
        raw: true,
      });
    },
    models,
    pubsub,
    appSecret: JWT_SECRET,
  };
}
