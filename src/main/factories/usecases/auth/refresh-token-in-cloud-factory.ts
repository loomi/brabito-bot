import { RefreshTokenInCloudUsecase } from '@/domain/usecases/auth';
import { RefreshTokenInCloud } from '@/domain/usecases/auth/refresh-token-in-cloud/refresh-token-in-cloud-in-cloud';
import { makeCognitoRefreshTokenInCloudProvider } from '@/main/factories/infra/cloud/cognito';

export const makeRefreshTokenInCloudUsecase =
  (): RefreshTokenInCloudUsecase => {
    const getRefreshTokenInCloudProvider =
      makeCognitoRefreshTokenInCloudProvider();

    return new RefreshTokenInCloud({
      getRefreshTokenInCloudProvider,
    });
  };
