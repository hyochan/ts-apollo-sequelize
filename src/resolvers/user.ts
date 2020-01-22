import { AuthPayload, Notification, Resolvers, Review, User } from '../generated/graphql';

import { AuthenticationError } from 'apollo-server-express';
import { Role } from '../types';
import { encryptCredential } from '../utils/auth';
import jwt from 'jsonwebtoken';
import { withFilter } from 'apollo-server';

const USER_ADDED = 'USER_ADDED';
const USER_UPDATED = 'USER_UPDATED';

const resolver: Resolvers = {
  Query: {
    users: async (_, args, { getUser, models }): Promise<User[]> => {
      const { User: userModel } = models;
      const user = await getUser();
      if (!user) throw new AuthenticationError('User is not logged in');

      return userModel.findAll();
    },
    user: (_, args, { models }): Promise<User> => {
      const { User } = models;

      return User.findOne({ where: args });
    },
  },
  Mutation: {
    signInGoogle: async (_, args, { appSecret, models }): Promise<AuthPayload> => {
      const { socialUser } = args;
      const { User: userModel } = models;

      try {
        if (socialUser.email) {
          const emailUser = await userModel.findOne({
            where: {
              email: socialUser.email,
              social: { $notLike: 'google%' },
            },
            raw: true,
          });

          if (emailUser) {
            throw new Error('Email for current user is already signed in');
          }
        }

        const user = await userModel.findOrCreate({
          where: { social: `google_${socialUser.social}` },
          defaults: {
            social: `google_${socialUser.social}`,
            email: socialUser.email,
            name: socialUser.name,
            nickname: socialUser.nickname,
            photo: socialUser.photo,
            birthday: socialUser.birthday,
            gender: socialUser.gender,
            phone: socialUser.phone,
            verified: false,
          },
        });

        if (!user || (user && user[1] === false)) {
          // user exists
        }

        const token: string = jwt.sign(
          {
            userId: user[0].id,
            role: Role.User,
          },
          appSecret,
        );
        return { token, user: user[0] };
      } catch (err) {
        throw new Error(err);
      }
    },
    signInFacebook: async (_, args, { appSecret, models }): Promise<AuthPayload> => {
      const { User: userModel } = models;

      try {
        if (args.socialUser.email) {
          const emailUser = await userModel.findOne({
            where: {
              email: args.socialUser.email,
              social: { $notLike: 'facebook%' },
            },
            raw: true,
          });

          if (emailUser) {
            throw new Error('Email for current user is already signed in');
          }
        }

        const user = await userModel.findOrCreate({
          where: { social: `facebook_${args.socialUser.social}` },
          defaults: {
            social: `facebook_${args.socialUser.social}`,
            email: args.socialUser.email,
            nickname: args.socialUser.name,
            name: args.socialUser.name,
            birthday: args.socialUser.birthday,
            gender: args.socialUser.gender,
            phone: args.socialUser.phone,
            verified: args.socialUser.email || false,
          },
        });

        if (!user || (user && user[1] === false)) {
          // user exists
        }

        const token: string = jwt.sign(
          {
            userId: user[0].id,
            role: Role.User,
          },
          appSecret,
        );
        return { token, user: user[0] };
      } catch (err) {
        throw new Error(err);
      }
    },
    signUp: async (_, args, { appSecret, models, pubsub }): Promise<AuthPayload> => {
      const { User: userModel } = models;

      const emailUser = await userModel.findOne({
        where: {
          email: args.user.email,
        },
        raw: true,
      });

      if (emailUser) {
        throw new Error('Email for current user is already signed up.');
      }
      args.user.password = await encryptCredential(args.user.password);
      const user = await models.User.create(args.user, { raw: true });
      const token: string = jwt.sign(
        {
          userId: user.id,
          role: Role.User,
        },
        appSecret,
      );

      pubsub.publish(USER_ADDED, {
        userAdded: user,
      });
      return { token, user };
    },
    updateProfile: async (_, args, { getUser, models, pubsub }): Promise<User> => {
      try {
        const auth = await getUser();
        if (auth.id !== args.user.id) {
          throw new AuthenticationError(
            'User can update his or her own profile',
          );
        }
        models.User.update(
          args,
          {
            where: {
              id: args.user.id,
            },
          },
        );

        const user = await models.User.findOne({
          where: {
            id: args.user.id,
          },
          raw: true,
        });

        pubsub.publish(USER_UPDATED, { user });
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Subscription: {
    userAdded: {
      // eslint-disable-next-line
      subscribe: (_, args, { pubsub }) => pubsub.asyncIterator(USER_ADDED),
    },
    userUpdated: {
      subscribe: withFilter(
        (_, args, { pubsub }) => pubsub.asyncIterator(USER_UPDATED),
        (payload, variables) => {
          return payload.userUpdated.id === variables.id;
        },
      ),
    },
  },
  User: {
    notifications: (_, args, { models }): Promise<Notification[]> => {
      const { Notification: notificationModel } = models;

      return notificationModel.findAll({
        where: {
          userId: _.id,
        },
      });
    },
    reviews: (_, args, { models }): Promise<Review[]> => {
      const { Review: reviewModel } = models;

      return reviewModel.findAll({
        where: {
          userId: _.id,
        },
      });
    },
  },
};

export default resolver;
