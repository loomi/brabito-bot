import { DeleteUserFromCloudRepository } from '@/domain/usecases/user/delete-user-from-cloud/protocols';
import { CognitoDeleteUserFromCloudRepository } from '@/infra/cloud/cognito';

export const makeCognitoDeleteUserFromCloudRepository =
  (): DeleteUserFromCloudRepository => {
    return new CognitoDeleteUserFromCloudRepository();
  };
