import { PrismaCreateUserInDatabaseRepository } from '@/infra/database/orm/prisma/repositories/user';
import { CreateUserInDatabaseService } from '@/domain/user/usecases/create-user-in-database';

import { makeUUIDGeneratorAdapter } from '../../infra/uuid';

export const makeCreateUserService = (): CreateUserInDatabaseService => {
  const createUserInDatabaseRepository =
    new PrismaCreateUserInDatabaseRepository();

  const UUIDGenerator = makeUUIDGeneratorAdapter();

  return new CreateUserInDatabaseService({
    createUserInDatabaseRepository,
    UUIDGenerator,
  });
};
