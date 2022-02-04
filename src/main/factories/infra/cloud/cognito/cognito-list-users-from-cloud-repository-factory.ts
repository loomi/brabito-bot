import { ListUsersFromCloudRepository } from '@/domain/usecases/user/list-users-from-cloud/protocols';
import { CognitoListUsersFromCloudRepository } from '@/infra/cloud/cognito';

export const makeCognitoListUsersFromCloudRepository =
  (): ListUsersFromCloudRepository => {
    return new CognitoListUsersFromCloudRepository();
  };
