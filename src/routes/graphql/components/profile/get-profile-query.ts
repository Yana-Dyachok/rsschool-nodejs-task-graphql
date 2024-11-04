import { GraphQLNonNull, GraphQLList, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { IContext } from '../../types/interfaces/context.js';
import { ProfileType } from './profile-type.js';

export const getProfileQuery = {
  profile: {
    type: ProfileType as GraphQLObjectType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_: unknown, args: { id: string }, { prisma }: IContext) => {
      const profile = await prisma.profile.findUnique({
        where: {
          id: args.id,
        },
      });
      return profile;
    },
  },

  profiles: {
    type: new GraphQLList(ProfileType),
    resolve: async (_: unknown, __: unknown, { prisma }: IContext) => {
      const profiles = await prisma.profile.findMany();
      return profiles;
    },
  },
};
