import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { getMemberTypeQuery } from './components/member-type/get-member-type-query.js';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...getMemberTypeQuery,
  }),
});

const getSchema = new GraphQLSchema({ query});

export default getSchema;
