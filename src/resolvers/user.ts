import { Resolvers } from '../generated/graphql';
import User from '../db/user';

const UserResolver: Resolvers = {
  Query: {
    allUsers: () => {
      return User.all();
    },
    getUser: (_, args) => User.findOne({ where: args }),
  },
  Mutation: {
    createUser: (_, args) => User.create(args),
  },
};

export default UserResolver;
