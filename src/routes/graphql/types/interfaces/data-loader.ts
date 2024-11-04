import { MemberType, Post, Profile, User } from '@prisma/client';
import DataLoader from 'dataloader';

export interface IDataLoader {
  userLoader: DataLoader<string, User | undefined>;
  usersLoader: DataLoader<string, User[]>;
  usersSubstLoader: DataLoader<string, User[]>;
  profileLoader: DataLoader<string, Profile | undefined>;
  postLoader: DataLoader<string, Post[] | undefined>;
  memberLoader: DataLoader<string, MemberType | undefined>;
}

