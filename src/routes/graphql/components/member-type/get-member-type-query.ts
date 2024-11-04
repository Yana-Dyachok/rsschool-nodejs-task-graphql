import { GraphQLList} from 'graphql';
import { IContext } from '../../types/interfaces/context.js';
import { memberTypeId } from '../../types/member-type-id.js';
import { MemberType } from './member-type.js';
import { MemberTypeId } from '../../../member-types/schemas.js';

export const getMemberTypeQuery = {
  memberType: {
    type: MemberType,
    args: {
      id: { type: memberTypeId },
    },
    resolve: async (_: unknown, args: { id: MemberTypeId}, { prisma }: IContext) => {
      const id = args.id ?? MemberTypeId.BASIC;  
      return await prisma.memberType.findUnique({ where: { id } });
    },
  },

  memberTypes: {
    type: new GraphQLList(MemberType),
    resolve: async (_: unknown, __: unknown, { prisma }: IContext) => {
      return await prisma.memberType.findMany();
    },
  },
};

