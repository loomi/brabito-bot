import { UpdateUserInDatabaseRepository } from '@/domain/usecases/user/update-user-in-database/protocols';
import { PrismaUpdateUserInDatabaseRepository } from '@/infra/databases/postgres/prisma/repositories/user';

export const makePrismaUpdateUserInDatabaseRepository =
  (): UpdateUserInDatabaseRepository => {
    return new PrismaUpdateUserInDatabaseRepository();
  };
