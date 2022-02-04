import { SaveUserInDatabaseRepository } from '@/domain/usecases/user/create-user-in-database/protocols';
import { prismaConnector } from '@/infra/databases/postgres/prisma';
import { PrismaClient } from '@prisma/client';

export class PrismaSaveUserInDatabaseRepository
  implements SaveUserInDatabaseRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async save(
    userParams: SaveUserInDatabaseRepository.Params
  ): Promise<SaveUserInDatabaseRepository.Result> {
    await this.prismaConnection.user.create({
      data: userParams,
    });
  }
}
