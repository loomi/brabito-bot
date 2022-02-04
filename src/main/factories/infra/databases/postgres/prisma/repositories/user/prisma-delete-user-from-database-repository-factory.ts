import { DeleteUserFromDatabaseRepository } from '@/domain/usecases/user/delete-user-from-database/protocols';
import { PrismaDeleteUserFromDatabaseRepository } from '@/infra/databases/postgres/prisma/repositories/user';

export const makePrismaDeleteUserFromDatabaseRepository =
  (): DeleteUserFromDatabaseRepository => {
    return new PrismaDeleteUserFromDatabaseRepository();
  };
