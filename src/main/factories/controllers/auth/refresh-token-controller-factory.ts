import { Controller } from '@/application/http-server/protocols';
import { makeLogControllerDecorator } from '@/main/factories/controllers';
import { makeRefreshTokenInCloudUsecase } from '@/main/factories/usecases/auth';
import { makeRefreshTokenValidation } from '@/main/factories/validation/auth';
import { RefreshTokenController } from '@/application/http-server/controllers/auth';

export const makeRefreshTokenController = (): Controller => {
  const refreshTokenUsecase = makeRefreshTokenInCloudUsecase();

  const validation = makeRefreshTokenValidation();

  const refreshTokenController = new RefreshTokenController(
    validation,
    refreshTokenUsecase
  );

  const refreshTokenControllerWithLogDecorator = makeLogControllerDecorator(
    refreshTokenController
  );

  return refreshTokenControllerWithLogDecorator;
};
