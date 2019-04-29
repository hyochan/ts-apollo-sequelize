import models from '../db';

export default {
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
