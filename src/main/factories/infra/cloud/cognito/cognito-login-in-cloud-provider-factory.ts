import { LoginInCloudProvider } from '@/domain/usecases/auth/login-in-cloud/protocols';
import { CognitoLoginInCloudProvider } from '@/infra/cloud/cognito';

export const makeCognitoLoginInCloudProvider = (): LoginInCloudProvider => {
  return new CognitoLoginInCloudProvider();
};
