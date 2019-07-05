import * as jwt from 'jsonwebtoken';
import { Resolvers } from '../generated/graphql';

const UserResolver: Resolvers = {
  Query: {
    users: (_, args, { models }) => {
      return models.User.findAll();
    },
    user: (_, args, { models }) => models.User.findOne({ where: args }),
  },
  Mutation: {
    signup: async (_, args, { appSecret, models }, info) => {
      const user = await models.User.create(args, { raw: true });
      const token: string = jwt.sign({ userId: user.id }, appSecret);
      return { token, user };
    },
  },
};

export default UserResolver;
