import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { getMemberTypeQuery } from './components/member-type/get-member-type-query.js';
import { getPostQuery } from './components/post/get-post-query.js';
import { getProfileQuery } from './components/profile/get-profile-query.js';
import { getUserQuery } from './components/users/get-user-query.js';
import { getPostMutation } from './components/post/get-post-mutation.js';
import { getUserMutation } from './components/users/get-user-mutation.js';
import { getProfileMutation } from './components/profile/get-profile-mutation.js';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...getMemberTypeQuery,
    ...getPostQuery,
    ...getProfileQuery,
    ...getUserQuery,
  }),
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...getPostMutation,
    ...getUserMutation ,
    ...getProfileMutation 
  }),
});

const getSchema = new GraphQLSchema({ query, mutation});

export default getSchema;








