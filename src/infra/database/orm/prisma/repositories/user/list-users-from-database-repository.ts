import { PrismaClient } from '.prisma/client';
import { ListUserssFromDatabaseRepositoryError } from '@/domain/user/usecases/list-users-from-database/errors';
import { ListUsersInDatabaseRepository } from '@/domain/user/usecases/list-users-from-database/protocols';
import { prismaConnector } from '@/infra/database/orm/prisma';
import { PrismaFormatter } from '../prisma-formatter';

export class PrismaListUsersInDatabaseRepository {
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async listUser(
    userFilter: ListUsersInDatabaseRepository.Params
  ): Promise<ListUsersInDatabaseRepository.Result> {
    try {
      const { take, skip, orderBy, ...restOfUserFilters } = userFilter;

      const restOfUserFilterObject =
        PrismaFormatter.formatFilter(restOfUserFilters);
      const userFindOptions = PrismaFormatter.formatFindOptions({
        take,
        skip,
        orderBy,
      });

      const users = await this.prismaConnection.user.findMany({
        where: restOfUserFilterObject,
        ...userFindOptions,
        // include: {
        //   prs: true,
        // },
      });

      const totalUsers = await this.prismaConnection.user.count({
        where: restOfUserFilterObject,
      });

      return { users, totalUsers };
    } catch (error) {
      const errorCatched = error as Error;

      const { message } = errorCatched;

      throw new ListUserssFromDatabaseRepositoryError(message);
    }
  }
}
