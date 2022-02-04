import { FirstLoginInCloudUsecase } from '@/domain/usecases/auth';
import {
  makeCognitoFirstLoginInCloudProvider,
  makeCognitoListUsersFromCloudRepository,
} from '@/main/factories/infra/cloud/cognito';
import { makeListUsersFromDatabaseUsecase } from '@/main/factories/usecases/user';
import { makeLoginInCloudUsecase } from '@/main/factories/usecases/auth';
import { FirstLoginInCloud } from '@/domain/usecases/auth/first-login-in-cloud/first-login-in-cloud';

export const makeFirstLoginInCloudUsecase = (): FirstLoginInCloudUsecase => {
  const listUsersFromDatabaseUsecase = makeListUsersFromDatabaseUsecase();
  const listUsersFromCloudUsecase = makeCognitoListUsersFromCloudRepository();
  const firstLoginInCloudProvider = makeCognitoFirstLoginInCloudProvider();
  const loginInCloudUsecase = makeLoginInCloudUsecase();

  return new FirstLoginInCloud({
    listUsersFromDatabaseUsecase,
    listUsersFromCloudUsecase,
    firstLoginInCloudProvider,
    loginInCloudUsecase,
  });
};
