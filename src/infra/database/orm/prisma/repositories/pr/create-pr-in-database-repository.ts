import { PrismaClient } from '@prisma/client';

import { CreatePrInDatabaseRepositoryError } from '@/domain/pr/usecases/create-pr-in-database/errors';
import { CreatePrInDatabaseRepository } from '@/domain/pr/usecases/create-pr-in-database/protocols';
import { prismaConnector } from '@/infra/database/orm/prisma';

export class PrismaCreatePrInDatabaseRepository
  implements CreatePrInDatabaseRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async createPr(
    prParams: CreatePrInDatabaseRepository.Params
  ): Promise<CreatePrInDatabaseRepository.Result> {
    try {
      const pr = prParams;
      const prParamsInJSON = pr.toJSON();

      delete prParamsInJSON.user;
      await this.prismaConnection.pr.create({
        data: prParamsInJSON,
      });
    } catch (error) {
      const errorCatched = error as Error;

      const { message } = errorCatched;

      throw new CreatePrInDatabaseRepositoryError(message);
    }
  }
}
