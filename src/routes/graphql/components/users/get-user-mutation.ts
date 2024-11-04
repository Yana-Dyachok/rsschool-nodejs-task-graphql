import {
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { IContext } from '../../types/interfaces/context.js';
import { UserType } from './user-type.js';
import { ICreateUser, IChangeUser } from '../../types/interfaces/user.js';

const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});

const ChangeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});

export const getUserMutation = {
  createUser: {
    type: UserType as GraphQLObjectType,
    args: { dto: { type: new GraphQLNonNull(CreateUserInput) } },
    resolve: async (_: unknown, { dto }: ICreateUser, { prisma }: IContext) =>
      await prisma.user.create({ data: dto }),
  },

  changeUser: {
    type: UserType as GraphQLObjectType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: ChangeUserInput },
    },
    resolve: async (_: unknown, { id, dto }: { id: string; dto: IChangeUser }, { prisma }: IContext) =>
      await prisma.user.update({ where: { id }, data: dto }),
  },

  deleteUser: {
    type: UUIDType,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (_: unknown, { id }: { id: string }, { prisma }: IContext) => {
      await prisma.user.delete({ where: { id } });
      return id;
    },
  },

  subscribeTo: {
    type: GraphQLString, 
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (
      _: unknown,
      { userId, authorId }: { userId: string; authorId: string },
      { prisma }: IContext
    ) => {
      await prisma.user.update({
        where: { id: userId },
        data: { userSubscribedTo: { create: { authorId } } },
      });
      return 'hello'; 
    },
  },
  

  unsubscribeFrom: {
    type: UUIDType,
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_: unknown, { userId, authorId }: { userId: string; authorId: string }, { prisma }: IContext) => {
      await prisma.subscribersOnAuthors.delete({
        where: { subscriberId_authorId: { subscriberId: userId, authorId } },
      });
      return userId;
    },
  },
};
