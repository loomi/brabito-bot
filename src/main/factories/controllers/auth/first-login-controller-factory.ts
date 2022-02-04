import { Controller } from '@/application/http-server/protocols';
import { makeLogControllerDecorator } from '@/main/factories/controllers';
import { makeFirstLoginInCloudUsecase } from '@/main/factories/usecases/auth';
import { makeFirstLoginValidation } from '@/main/factories/validation/auth';
import { FirstLoginController } from '@/application/http-server/controllers/auth';

export const makeFirstFirstLoginController = (): Controller => {
  const firstLoginUsecase = makeFirstLoginInCloudUsecase();

  const validation = makeFirstLoginValidation();

  const firstLoginController = new FirstLoginController(
    validation,
    firstLoginUsecase
  );

  const firstLoginControllerWithLogDecorator =
    makeLogControllerDecorator(firstLoginController);

  return firstLoginControllerWithLogDecorator;
};
