import { CreateUserInDatabaseAndCloudUsecase } from '@/domain/usecases/user';
import { CreateUserInDatabaseAndCloud } from '@/domain/usecases/user/create-user-in-database-and-cloud/create-user-in-database-and-cloud';
import { makeDeleteUserFromDatabaseUsecase } from '@/main/factories/usecases/user';
import { makeCreateUserInCloudUsecase } from './create-user-in-cloud-factory';
import { makeCreateUserInDatabaseUsecase } from './create-user-in-database-factory';

export const makeCreateUserInDatabaseAndCloudUsecase =
  (): CreateUserInDatabaseAndCloudUsecase => {
    const createUserInDatabaseUsecase = makeCreateUserInDatabaseUsecase();
    const createUserInCloudUsecase = makeCreateUserInCloudUsecase();
    const deleteUserFromDatabaseUsecase = makeDeleteUserFromDatabaseUsecase();

    return new CreateUserInDatabaseAndCloud({
      createUserInDatabaseUsecase,
      createUserInCloudUsecase,
      deleteUserFromDatabaseUsecase,
    });
  };
