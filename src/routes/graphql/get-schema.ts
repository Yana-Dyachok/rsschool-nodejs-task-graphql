import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { getMemberTypeQuery } from './components/member-type/get-member-type-query.js';
import { getPostQuery } from './components/post/get-post-query.js';
import { getProfileQuery } from './components/profile/get-profile-query.js';
import { getUserQuery } from './components/users/get-user-query.js';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...getMemberTypeQuery,
    ...getPostQuery,
    ...getProfileQuery,
    ...getUserQuery,
  }),
});

const getSchema = new GraphQLSchema({ query});

export default getSchema;
