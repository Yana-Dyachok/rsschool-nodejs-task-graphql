import { GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { memberTypeId } from '../../types/member-type-id.js';

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: { type: memberTypeId },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

