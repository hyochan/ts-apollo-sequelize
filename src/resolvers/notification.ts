import { Notification, Resolvers } from '../generated/graphql';

const resolver: Resolvers = {
  Mutation: {
    addNotificationToken: async (_, args, { models }): Promise<Notification> => {
      try {
        const notification = await models.Notification.create(
          args.notification,
          { raw: true },
        );
        return notification;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default resolver;
