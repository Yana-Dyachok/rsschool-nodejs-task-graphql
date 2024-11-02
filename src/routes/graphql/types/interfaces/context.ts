import { PrismaClient } from '@prisma/client';
import { IDataLoader } from './data-loader.js';

export interface IContext {
    prisma: PrismaClient;
    loaders: IDataLoader;
}
