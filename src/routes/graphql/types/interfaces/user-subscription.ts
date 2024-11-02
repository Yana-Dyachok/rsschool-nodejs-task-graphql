import type { User } from '@prisma/client';

type Subscription = {
  subscriberId: string;
  authorId: string;
};

export interface IUserSubscription extends User {
  userSubscribedTo?: Subscription[];
  subscribedToUser?: Subscription[];
}
