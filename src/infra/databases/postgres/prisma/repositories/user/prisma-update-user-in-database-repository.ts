import { UpdateUserInDatabaseRepository } from '@/domain/usecases/user/update-user-in-database/protocols';
import { prismaConnector } from '@/infra/databases/postgres/prisma';
import { PrismaClient } from '@prisma/client';

export class PrismaUpdateUserInDatabaseRepository
  implements UpdateUserInDatabaseRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async update(
    userToUpdate: UpdateUserInDatabaseRepository.Params
  ): Promise<UpdateUserInDatabaseRepository.Result> {
    const { id, ...restOfUserInJSON } = userToUpdate;

    await this.prismaConnection.user.update({
      where: { id },
      data: restOfUserInJSON,
    });
  }
}
