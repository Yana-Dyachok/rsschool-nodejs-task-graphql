import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import { IContext } from '../../types/interfaces/context.js';
import { UUIDType } from '../../types/uuid.js';
import { ProfileType } from './profile-type.js';
import { memberTypeId } from '../../types/member-type-id.js';
import { ICreateProfile, IChangeProfile } from '../../types/interfaces/profile.js';

const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: memberTypeId },
  }),
});

const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: memberTypeId },
  }),
});

export const getProfileMutation = {
  createProfile: {
    type: ProfileType as GraphQLObjectType,
    args: { dto: { type: new GraphQLNonNull(CreateProfileInput) } },
    resolve: async (_: unknown, { dto }: ICreateProfile, { prisma }: IContext) =>
      await prisma.profile.create({ data: dto }),
  },

  changeProfile: {
    type: ProfileType as GraphQLObjectType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangeProfileInput) },
    },
    resolve: async (_: unknown, { id, dto }: { id: string; dto: IChangeProfile }, { prisma }: IContext) =>
      await prisma.profile.update({ where: { id }, data: dto }),
  },

  deleteProfile: {
    type: UUIDType,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (_: unknown, { id }: { id: string }, { prisma }: IContext) => {
      await prisma.profile.delete({ where: { id } });
      return id;
    },
  },
};
