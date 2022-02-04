import { ForgotPasswordInCloudUsecase } from '@/domain/usecases/auth';
import {
  makeCognitoForgotPasswordInCloudProvider,
  makeCognitoListUsersFromCloudRepository,
} from '@/main/factories/infra/cloud/cognito';

import { makeListUsersFromDatabaseUsecase } from '@/main/factories/usecases/user';
import { ForgotPasswordInCloud } from '@/domain/usecases/auth/forgot-password-in-cloud/forgot-password-in-cloud';

export const makeForgotPasswordInCloudUsecase =
  (): ForgotPasswordInCloudUsecase => {
    const listUsersFromCloudUsecase = makeCognitoListUsersFromCloudRepository();
    const listUsersFromDatabaseUsecase = makeListUsersFromDatabaseUsecase();
    const forgotPasswordInCloudProvider =
      makeCognitoForgotPasswordInCloudProvider();

    return new ForgotPasswordInCloud({
      listUsersFromCloudUsecase,
      listUsersFromDatabaseUsecase,
      forgotPasswordInCloudProvider,
    });
  };
