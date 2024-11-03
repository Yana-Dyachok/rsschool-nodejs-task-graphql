import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { MemberType } from '../member-type/member-type.js';
import { PrismaClient } from '@prisma/client';
import { MemberTypeId } from '../../../member-types/schemas.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async (
        { memberTypeId }: { memberTypeId: MemberTypeId },
        _: unknown,
        context: { prisma: PrismaClient },
      ) => {
        const id = memberTypeId || MemberTypeId.BASIC;
        return await context.prisma.memberType.findUnique({
          where: { id },
        });
      },
    },
  },
});
