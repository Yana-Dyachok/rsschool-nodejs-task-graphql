import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLList } from "graphql";
import { UUIDType } from "../../types/uuid.js";
import { PostType } from "../post/post-type.js";
import { ProfileType } from "../profile/profile-type.js";
import { IContext } from "../../types/interfaces/context.js";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType,
      resolve: async (parent: { id: string }, _: unknown, context: IContext) => {
        const profile = await context.prisma.profile.findUnique({
          where: {
            userId: parent.id,
          },
        });
        return profile;
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (parent: { id: string }, _: unknown, context: IContext) => {
        const posts = await context.prisma.post.findMany({
          where: {
            authorId: parent.id,
          },
        });
        return posts;
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (parent: { id: string }, _: unknown, context: IContext) => {
        const subscriptions = await context.prisma.user.findMany({
          where: {
            subscribedToUser: { some: { subscriberId: parent.id } }
          }
        });
        return subscriptions;   
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (parent: { id: string }, _: unknown, context: IContext) => {
        const subscribers = await context.prisma.user.findMany({
          where: {
            userSubscribedTo: { some: { authorId: parent.id } }
          }
        });
        return subscribers;
      },
    }
  }),
});
