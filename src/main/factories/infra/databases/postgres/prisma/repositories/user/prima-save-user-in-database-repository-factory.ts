import { SaveUserInDatabaseRepository } from '@/domain/usecases/user/create-user-in-database/protocols';
import { PrismaSaveUserInDatabaseRepository } from '@/infra/databases/postgres/prisma/repositories/user';

export const makePrismaSaveUserInDatabaseRepository =
  (): SaveUserInDatabaseRepository => {
    return new PrismaSaveUserInDatabaseRepository();
  };
