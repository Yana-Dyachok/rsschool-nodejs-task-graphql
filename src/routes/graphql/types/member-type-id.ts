import { GraphQLEnumType } from 'graphql';
import { MemberTypeId } from '../../member-types/schemas.js';

export const memberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: {
      value: MemberTypeId.BASIC,
    },
    BUSINESS: {
      value: MemberTypeId.BUSINESS,
    },
  },
});
