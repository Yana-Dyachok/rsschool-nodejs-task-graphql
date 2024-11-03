// import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from 'graphql';
// import { Profile } from '@prisma/client';
// import { UUIDType } from '../../types/uuid.js';
// import { IContext } from '../../types/interfaces/context.js';
// import { MemberType } from '../member-type/member-type.js';
// import { memberTypeId } from '../../types/member-type-id.js';
// import { UserType } from '../users.ts/user-type.js';

// const resolveUser = async ({ userId }: Profile, _: unknown, { prisma }: IContext) =>
//   prisma.user.findUnique({ where: { id: userId } });

// const resolveMemberType = async (
//   { memberTypeId }: Profile,
//   _: unknown,
//   { loaders, prisma }: IContext,
// ) => {
//   if (loaders.memberLoader) {
//     return loaders.memberLoader.load(memberTypeId);
//   }
//   return prisma.memberType.findUnique({ where: { id: memberTypeId } });
// };

// export const ProfileType = new GraphQLObjectType({
//   name: 'Profile',
//   fields: () => ({
//     id: { type: UUIDType },
//     isMale: { type: GraphQLBoolean },
//     yearOfBirth: { type: GraphQLInt },
//     userId: { type: UUIDType },
//     memberTypeId: { type: memberTypeId },
//     user: { type: UserType, resolve: resolveUser },
//     memberType: { type: MemberType, resolve: resolveMemberType },
//   }),
// });

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
