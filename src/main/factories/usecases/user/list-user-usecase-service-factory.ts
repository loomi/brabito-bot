import { PrismaListUsersInDatabaseRepository } from '@/infra/database/orm/prisma/repositories/user';

import { ListUsersInDatabaseService } from '@/domain/user/usecases/list-users-from-database';

export const makeListUserService = (): ListUsersInDatabaseService => {
  const listUsersInDatabaseRepository =
    new PrismaListUsersInDatabaseRepository();

  return new ListUsersInDatabaseService({ listUsersInDatabaseRepository });
};
