import {
  CreateUserInDatabase,
  CreateUserInDatabaseUsecase,
} from '@/domain/usecases/user/create-user-in-database';
import { makePrismaSaveUserInDatabaseRepository } from '@/main/factories/infra/databases/postgres/prisma/repositories/user';
import { makeUUIDGeneratorAdapter } from '@/main/factories/infra/uuid';
import { makeListUsersFromDatabaseUsecase } from '@/main/factories/usecases/user';

export const makeCreateUserInDatabaseUsecase =
  (): CreateUserInDatabaseUsecase => {
    const saveUserInDatabaseRepository =
      makePrismaSaveUserInDatabaseRepository();

    const listUsersFromDatabaseUsecase = makeListUsersFromDatabaseUsecase();

    const UUIDGenerator = makeUUIDGeneratorAdapter();

    return new CreateUserInDatabase({
      saveUserInDatabaseRepository,
      listUsersFromDatabaseUsecase,
      UUIDGenerator,
    });
  };
