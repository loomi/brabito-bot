import { PrismaClient } from '.prisma/client';
import { ListPrsFromDatabaseRepositoryError } from '@/domain/pr/usecases/list-prs-from-database/errors';
import { ListPrsFromDatabaseRepository } from '@/domain/pr/usecases/list-prs-from-database/protocols';
import { prismaConnector } from '@/infra/database/orm/prisma';
import { PrismaFormatter } from '../prisma-formatter';

export class PrismaListPrsFromDatabaseRepository {
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async listPr(
    prFilter: ListPrsFromDatabaseRepository.Params
  ): Promise<ListPrsFromDatabaseRepository.Result> {
    try {
      const { take, skip, orderBy, ...restOfPrFilters } = prFilter;

      const restOfPrFilterObject =
        PrismaFormatter.formatFilter(restOfPrFilters);
      const prFindOptions = PrismaFormatter.formatFindOptions({
        take,
        skip,
        orderBy,
      });

      const prs = await this.prismaConnection.pr.findMany({
        where: restOfPrFilterObject,
        ...prFindOptions,
        include: {
          prs: true,
        },
      });

      const totalPrs = await this.prismaConnection.pr.count({
        where: restOfPrFilterObject,
      });

      return { prs, totalPrs };
    } catch (error) {
      const errorCatched = error as Error;

      const { message } = errorCatched;

      throw new ListPrsFromDatabaseRepositoryError(message);
    }
  }
}
