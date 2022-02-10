import { PrismaClient } from '@prisma/client';

import { CreateUserInDatabaseRepositoryError } from '@/domain/user/usecases/create-user-in-database/errors';
import { CreateUserInDatabaseRepository } from '@/domain/user/usecases/create-user-in-database/protocols';
import { prismaConnector } from '@/infra/database/orm/prisma';

export class PrismaCreateUserInDatabaseRepository
  implements CreateUserInDatabaseRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async createUser(
    userParams: CreateUserInDatabaseRepository.Params
  ): Promise<CreateUserInDatabaseRepository.Result> {
    try {
      const user = userParams;
      const userParamsInJSON = user.toJSON();

      await this.prismaConnection.user.create({
        data: userParamsInJSON,
      });
    } catch (error) {
      const errorCatched = error as Error;

      const { message } = errorCatched;

      throw new CreateUserInDatabaseRepositoryError(message);
    }
  }
}
