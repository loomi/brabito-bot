import { DeleteUserFromDatabaseRepository } from '@/domain/usecases/user/delete-user-from-database/protocols';
import { prismaConnector } from '@/infra/databases/postgres/prisma';
import { PrismaClient } from '@prisma/client';

export class PrismaDeleteUserFromDatabaseRepository
  implements DeleteUserFromDatabaseRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async delete(
    userParams: DeleteUserFromDatabaseRepository.Params
  ): Promise<DeleteUserFromDatabaseRepository.Result> {
    const { id } = userParams;

    await this.prismaConnection.user.delete({
      where: { id },
    });
  }
}
