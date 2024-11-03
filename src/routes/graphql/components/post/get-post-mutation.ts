import {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';
import { IContext } from '../../types/interfaces/context.js';
import { UUIDType } from '../../types/uuid.js';
import { PostType } from './post-type.js';
import { ICreatePost, IChangePost } from '../../types/interfaces/post.js';

export const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => ({
    authorId: { type: new GraphQLNonNull(UUIDType) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const ChangePostInput = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    content: { type: GraphQLString },
    title: { type: GraphQLString },
  }),
});

export const getPostMutation = {
  createPost: {
    type: PostType as GraphQLObjectType,
    args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
    resolve: async (_: unknown, { dto }: ICreatePost, { prisma }: IContext) =>
      await prisma.post.create({ data: dto }),
  },

  changePost: {
    type: PostType as GraphQLObjectType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: ChangePostInput },
    },
    resolve: async (_: unknown, { id, dto }: { id: string; dto: IChangePost }, { prisma }: IContext) =>
      await prisma.post.update({ where: { id }, data: dto }),
  },

  deletePost: {
    type: UUIDType,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (_: unknown, { id }: { id: string }, { prisma }: IContext) => {
      await prisma.post.delete({ where: { id } });
      return id;
    },
  },
};