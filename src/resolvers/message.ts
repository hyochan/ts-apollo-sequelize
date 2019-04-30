import { Resolvers } from '../generated/graphql';

import Message from '../db/message';

const resolver: Resolvers = {
  Mutation: {
    createMessage: async(_, args, { user }) => {
      try {
        await Message.create({
          ...args,
          userId: user.id,
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};

export default resolver;
