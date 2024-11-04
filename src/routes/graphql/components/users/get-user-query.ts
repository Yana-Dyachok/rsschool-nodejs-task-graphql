import { GraphQLNonNull, GraphQLList } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { UserType } from './user-type.js';
import { IContext } from '../../types/interfaces/context.js';

export const getUserQuery = {
  user: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_: unknown, args: { id: string }, context: IContext) => {
      const user = await context.prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });
      return user;
    },
  },

  users: {
    type: new GraphQLList(UserType),
    resolve: async (_: unknown, __: unknown, context: IContext) => {
      const users = await context.prisma.user.findMany();
      return users;
    },
  },
};
