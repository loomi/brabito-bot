import { ListUsersFromDatabaseRepository } from '@/domain/usecases/user/list-users-from-database/protocols';
import { PrismaListUsersInDatabaseRepository } from '@/infra/databases/postgres/prisma/repositories/user';

export const makePrismaListUsersFromDatabaseRepository =
  (): ListUsersFromDatabaseRepository => {
    return new PrismaListUsersInDatabaseRepository();
  };
