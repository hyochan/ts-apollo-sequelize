import * as jwt from 'jsonwebtoken';
import { Resolvers } from '../generated/graphql';
import User from '../db/user';

const UserResolver: Resolvers = {
  Query: {
    users: () => {
      return User.all();
    },
    user: (_, args) => User.findOne({ where: args }),
  },
  Mutation: {
    signup: async(_, args, context, info) => {
      const user = await User.create(args, { raw: true });
      const token: string = jwt.sign({ userId: user.id }, context.appSecret);
      return { token, user };
    },
  },
};

export default UserResolver;
