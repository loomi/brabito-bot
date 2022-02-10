import { PrismaListPrsFromDatabaseRepository } from '@/infra/database/orm/prisma/repositories/pr';

import { ListPrsInDatabaseService } from '@/domain/pr/usecases/list-prs-from-database';

export const makeListPrService = (): ListPrsInDatabaseService => {
  const listPrsInDatabaseRepository = new PrismaListPrsFromDatabaseRepository();

  return new ListPrsInDatabaseService({ listPrsInDatabaseRepository });
};
