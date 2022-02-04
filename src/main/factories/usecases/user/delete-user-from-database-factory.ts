import {
  DeleteUserFromDatabaseUsecase,
  DeleteUserFromDatabase,
} from '@/domain/usecases/user/delete-user-from-database';
import { makePrismaDeleteUserFromDatabaseRepository } from '@/main/factories/infra/databases/postgres/prisma/repositories/user';
import { makeListUsersFromDatabaseUsecase } from '@/main/factories/usecases/user';

export const makeDeleteUserFromDatabaseUsecase =
  (): DeleteUserFromDatabaseUsecase => {
    const listUsersFromDatabaseUsecase = makeListUsersFromDatabaseUsecase();

    const deleteUserFromDatabaseRepository =
      makePrismaDeleteUserFromDatabaseRepository();

    return new DeleteUserFromDatabase({
      listUsersFromDatabaseUsecase,
      deleteUserFromDatabaseRepository,
    });
  };
