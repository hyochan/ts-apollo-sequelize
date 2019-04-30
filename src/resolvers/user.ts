import models from '../db';
import { Resolvers } from '../generated/graphql';

const UserResolver: Resolvers = {
  Query: {
    allUsers: () => {
      return models.User.all();
    },
    getUser: (_, args) => models.User.findOne({ where: args }),
  },
  Mutation: {
    createUser: (_, args) => models.User.create(args),
  },
};

export default UserResolver;
