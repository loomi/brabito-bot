import { GetRefreshTokenInCloudProvider } from '@/domain/usecases/auth/refresh-token-in-cloud/protocols';
import { CognitoRefreshTokenInCloudProvider } from '@/infra/cloud/cognito';

export const makeCognitoRefreshTokenInCloudProvider =
  (): GetRefreshTokenInCloudProvider => {
    return new CognitoRefreshTokenInCloudProvider();
  };
