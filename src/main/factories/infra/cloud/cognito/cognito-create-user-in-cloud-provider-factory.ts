import { SaveUserInCloudRepository } from '@/domain/usecases/user/create-user-in-cloud/protocols';
import { CognitoSaveUserInCloudRepository } from '@/infra/cloud/cognito';

export const makeCognitoSaveUserInCloudRepository =
  (): SaveUserInCloudRepository => {
    return new CognitoSaveUserInCloudRepository();
  };
