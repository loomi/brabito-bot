import { PrismaClient } from '@prisma/client';
import { UpdatePrInDatabaseRepositoryError } from '@/domain/pr/usecases/update-pr-in-database/errors';
import { UpdatePrInDatabaseRepository } from '@/domain/pr/usecases/update-pr-in-database/protocols';
import { prismaConnector } from '@/infra/database/orm/prisma';

export class PrismaUpdatePrInDatabaseRepository
  implements UpdatePrInDatabaseRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async updatePr(
    prToUpdate: UpdatePrInDatabaseRepository.Params
  ): Promise<UpdatePrInDatabaseRepository.Result> {
    try {
      const { id, ...restOfPrInJSON } = prToUpdate.toJSON();

      await this.prismaConnection.pr.update({
        where: { id },
        data: restOfPrInJSON,
      });
    } catch (error) {
      const errorCatched = error as Error;

      const { message } = errorCatched;

      throw new UpdatePrInDatabaseRepositoryError(message);
    }
  }
}
