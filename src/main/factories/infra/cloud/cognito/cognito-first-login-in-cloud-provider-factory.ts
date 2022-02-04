import { FirstLoginInCloudProvider } from '@/domain/usecases/auth/first-login-in-cloud/protocols';
import { CognitoFirstLoginInCloudProvider } from '@/infra/cloud/cognito';

export const makeCognitoFirstLoginInCloudProvider =
  (): FirstLoginInCloudProvider => {
    return new CognitoFirstLoginInCloudProvider();
  };
