import { GraphQLNonNull, GraphQLList, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { IContext } from '../../types/interfaces/context.js';
import { PostType } from './post-type.js';

export const getPostQuery = {
  post: {
    type: PostType as GraphQLObjectType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_: unknown, args: { id: string }, { prisma }: IContext) => {
      const post = await prisma.post.findUnique({
        where: {
          id: args.id,
        },
      });
      return post;
    },
  },

  posts: {
    type: new GraphQLList(PostType),
    resolve: async (_: unknown, __: unknown, { prisma }: IContext) => {
      const posts = await prisma.post.findMany();
      return posts;
    },
  },
};
