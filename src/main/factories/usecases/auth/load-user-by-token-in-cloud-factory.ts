import { LoadUserByTokenInCloudUsecase } from '@/domain/usecases/auth';
import { makeCognitLoadUserByTokenInCloudProvider } from '@/main/factories/infra/cloud/cognito';
import { LoadUserByTokenInCloud } from '@/domain/usecases/auth/load-user-by-token-in-cloud/load-user-by-token-in-cloud';

export const makeLoadUserByTokenInCloudUsecase =
  (): LoadUserByTokenInCloudUsecase => {
    const loadUserByTokenInCloudProvider =
      makeCognitLoadUserByTokenInCloudProvider();

    return new LoadUserByTokenInCloud({
      loadUserByTokenInCloudProvider,
    });
  };
