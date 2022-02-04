import { PrismaClient } from '.prisma/client';
import { ListUsersFromDatabaseRepository } from '@/domain/usecases/user/list-users-from-database/protocols';

import { prismaConnector } from '@/infra/databases/postgres/prisma';
import { PrismaFormatter } from '@/infra/databases/postgres/prisma/repositories/prisma-formatter';

export class PrismaListUsersInDatabaseRepository
  implements ListUsersFromDatabaseRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async countUsers(
    userFilters: ListUsersFromDatabaseRepository.Params
  ): Promise<{ totalUsers: number }> {
    const userfilterObject = PrismaFormatter.formatFilter(userFilters);

    const totalUsers = await this.prismaConnection.user.count({
      where: userfilterObject,
    });

    return { totalUsers };
  }

  async list(
    userFilter: ListUsersFromDatabaseRepository.Params
  ): Promise<ListUsersFromDatabaseRepository.Result> {
    const { take, skip, orderBy, ...restOfUserFilters } = userFilter;

    const userFilterObject = PrismaFormatter.formatFilter(restOfUserFilters);
    const userFindOptions = PrismaFormatter.formatFindOptions({
      take,
      skip,
      orderBy,
    });

    // @ts-ignore
    const users = await this.prismaConnection.user.findMany({
      where: userFilterObject,
      ...userFindOptions,
    });

    const { totalUsers } = await this.countUsers(restOfUserFilters);

    return { users, totalUsers };
  }
}
