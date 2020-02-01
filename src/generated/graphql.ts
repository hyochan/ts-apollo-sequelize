import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { MyContext } from '../context';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
  Date: any,
};

export type AuthPayload = {
   __typename?: 'AuthPayload',
  token: Scalars['String'],
  user: User,
};

export enum AuthType {
  Email = 'EMAIL',
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE',
  Apple = 'APPLE'
}



export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE'
}

export type Mutation = {
   __typename?: 'Mutation',
  addNotificationToken?: Maybe<Notification>,
  signInApple: AuthPayload,
  signInFacebook: AuthPayload,
  signInGoogle: AuthPayload,
  signUp: AuthPayload,
  updateProfile?: Maybe<User>,
};


export type MutationAddNotificationTokenArgs = {
  notification: NotificationCreateInput
};


export type MutationSignInAppleArgs = {
  socialUser: SocialUserInput
};


export type MutationSignInFacebookArgs = {
  socialUser: SocialUserInput
};


export type MutationSignInGoogleArgs = {
  socialUser: SocialUserInput
};


export type MutationSignUpArgs = {
  user: UserInput
};


export type MutationUpdateProfileArgs = {
  user: UserInput
};

export type Notification = {
   __typename?: 'Notification',
  createdAt?: Maybe<Scalars['DateTime']>,
  device?: Maybe<Scalars['String']>,
  id: Scalars['ID'],
  os?: Maybe<Scalars['String']>,
  token?: Maybe<Scalars['String']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type NotificationCreateInput = {
  userId: Scalars['ID'],
  token: Scalars['String'],
  device?: Maybe<Scalars['String']>,
  os?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  review?: Maybe<Review>,
  reviews: Array<Review>,
  user?: Maybe<User>,
  users: Array<User>,
};


export type QueryReviewArgs = {
  id: Scalars['ID']
};


export type QueryUserArgs = {
  id: Scalars['ID']
};

export type Review = {
   __typename?: 'Review',
  content?: Maybe<Scalars['String']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  id: Scalars['ID'],
  rating: Scalars['Float'],
  title?: Maybe<Scalars['String']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type SocialUserInput = {
  socialId: Scalars['String'],
  authType: AuthType,
  email?: Maybe<Scalars['String']>,
  photoURL?: Maybe<Scalars['String']>,
  thumbURL?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  nickname?: Maybe<Scalars['String']>,
  birthday?: Maybe<Scalars['Date']>,
  gender?: Maybe<Gender>,
  phone?: Maybe<Scalars['String']>,
};

export type Subscription = {
   __typename?: 'Subscription',
  userAdded?: Maybe<User>,
  userUpdated?: Maybe<User>,
};

export type User = {
   __typename?: 'User',
  authType?: Maybe<AuthType>,
  birthday?: Maybe<Scalars['Date']>,
  createdAt: Scalars['DateTime'],
  deletedAt?: Maybe<Scalars['DateTime']>,
  email?: Maybe<Scalars['String']>,
  gender?: Maybe<Gender>,
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  nickname?: Maybe<Scalars['String']>,
  notifications?: Maybe<Array<Maybe<Notification>>>,
  phone?: Maybe<Scalars['String']>,
  photoURL?: Maybe<Scalars['String']>,
  reviews?: Maybe<Array<Maybe<Review>>>,
  socialId?: Maybe<Scalars['String']>,
  thumbURL?: Maybe<Scalars['String']>,
  updatedAt: Scalars['DateTime'],
  verified?: Maybe<Scalars['Boolean']>,
};

export type UserInput = {
  email: Scalars['String'],
  password: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  nickname?: Maybe<Scalars['String']>,
  birthday?: Maybe<Scalars['Date']>,
  gender?: Maybe<Gender>,
  phone?: Maybe<Scalars['String']>,
  statusMessage?: Maybe<Scalars['String']>,
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn = (obj: any, info: GraphQLResolveInfo) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Review: ResolverTypeWrapper<Review>,
  String: ResolverTypeWrapper<Scalars['String']>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  User: ResolverTypeWrapper<User>,
  AuthType: AuthType,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  Gender: Gender,
  Notification: ResolverTypeWrapper<Notification>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Mutation: ResolverTypeWrapper<{}>,
  NotificationCreateInput: NotificationCreateInput,
  SocialUserInput: SocialUserInput,
  AuthPayload: ResolverTypeWrapper<AuthPayload>,
  UserInput: UserInput,
  Subscription: ResolverTypeWrapper<{}>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  ID: Scalars['ID'],
  Review: Review,
  String: Scalars['String'],
  DateTime: Scalars['DateTime'],
  Float: Scalars['Float'],
  User: User,
  AuthType: AuthType,
  Date: Scalars['Date'],
  Gender: Gender,
  Notification: Notification,
  Boolean: Scalars['Boolean'],
  Mutation: {},
  NotificationCreateInput: NotificationCreateInput,
  SocialUserInput: SocialUserInput,
  AuthPayload: AuthPayload,
  UserInput: UserInput,
  Subscription: {},
};

export type AuthPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addNotificationToken?: Resolver<Maybe<ResolversTypes['Notification']>, ParentType, ContextType, RequireFields<MutationAddNotificationTokenArgs, 'notification'>>,
  signInApple?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignInAppleArgs, 'socialUser'>>,
  signInFacebook?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignInFacebookArgs, 'socialUser'>>,
  signInGoogle?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignInGoogleArgs, 'socialUser'>>,
  signUp?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'user'>>,
  updateProfile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateProfileArgs, 'user'>>,
};

export type NotificationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  device?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  os?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  review?: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<QueryReviewArgs, 'id'>>,
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
};

export type ReviewResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export type SubscriptionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  userAdded?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "userAdded", ParentType, ContextType>,
  userUpdated?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "userUpdated", ParentType, ContextType>,
};

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  authType?: Resolver<Maybe<ResolversTypes['AuthType']>, ParentType, ContextType>,
  birthday?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  nickname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  notifications?: Resolver<Maybe<Array<Maybe<ResolversTypes['Notification']>>>, ParentType, ContextType>,
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  photoURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  reviews?: Resolver<Maybe<Array<Maybe<ResolversTypes['Review']>>>, ParentType, ContextType>,
  socialId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  thumbURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export type Resolvers<ContextType = MyContext> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>,
  Date?: GraphQLScalarType,
  DateTime?: GraphQLScalarType,
  Mutation?: MutationResolvers<ContextType>,
  Notification?: NotificationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Review?: ReviewResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = MyContext> = Resolvers<ContextType>;
