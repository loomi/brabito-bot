import { LoadUserByTokenInCloudProvider } from '@/domain/usecases/auth/load-user-by-token-in-cloud/protocols';
import { CognitoLoadUserByTokenInCloudProvider } from '@/infra/cloud/cognito';

export const makeCognitLoadUserByTokenInCloudProvider =
  (): LoadUserByTokenInCloudProvider => {
    return new CognitoLoadUserByTokenInCloudProvider();
  };
