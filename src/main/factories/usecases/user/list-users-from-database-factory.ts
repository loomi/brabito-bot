import {
  ListUsersFromDatabaseUsecase,
  ListUsersFromDatabase,
} from '@/domain/usecases/user/list-users-from-database';
import { makePrismaListUsersFromDatabaseRepository } from '@/main/factories/infra/databases/postgres/prisma/repositories/user';

export const makeListUsersFromDatabaseUsecase =
  (): ListUsersFromDatabaseUsecase => {
    const listUsersFromDatabaseRepository =
      makePrismaListUsersFromDatabaseRepository();

    return new ListUsersFromDatabase({
      listUsersFromDatabaseRepository,
    });
  };
