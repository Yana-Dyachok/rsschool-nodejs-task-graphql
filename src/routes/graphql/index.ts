import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, validate, parse, GraphQLError } from 'graphql';
import getSchema from './get-schema.js';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      try {
        const parsedQuery = parse(query);
        const validationErrors = validate(getSchema, parsedQuery, [depthLimit(5)]);

        if (validationErrors.length > 0) {
          console.error('GraphQL Validation Errors:', validationErrors);
          return { errors: validationErrors };
        }

        const { data, errors } = await graphql({
          schema: getSchema,
          source: query,
          variableValues: variables,
          contextValue: {
            prisma,
          },
        });

        return { data, errors };
      } catch (error) {
        if (error instanceof GraphQLError) {
          console.error('GraphQL Error:', error.message);
          return { errors: [error] };
        } else {
          console.error('Unknown Error:', error);
          return { errors: [new GraphQLError('Internal server error')] };
        }
      }
    },
  });
};

export default plugin;
