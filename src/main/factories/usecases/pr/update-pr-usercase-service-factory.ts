import { PrismaUpdatePrInDatabaseRepository } from '@/infra/database/orm/prisma/repositories/pr';

import { UpdatePrInDatabaseService } from '@/domain/pr/usecases/update-pr-in-database';
import { makeListPrService } from '.';

export const makeUpdatePrService = (): UpdatePrInDatabaseService => {
  const updatePrInDatabaseRepository = new PrismaUpdatePrInDatabaseRepository();

  const listPrsUsecase = makeListPrService();

  return new UpdatePrInDatabaseService({
    listPrsUsecase,
    updatePrInDatabaseRepository,
  });
};
