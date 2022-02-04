import { Controller } from '@/application/http-server/protocols';
import { makeLogControllerDecorator } from '@/main/factories/controllers';
import { makeForgotPasswordInCloudUsecase } from '@/main/factories/usecases/auth';
import { makeForgotPasswordValidation } from '@/main/factories/validation/auth';
import { ForgotPasswordController } from '@/application/http-server/controllers/auth';

export const makeForgotPasswordController = (): Controller => {
  const forgotPasswordUsecase = makeForgotPasswordInCloudUsecase();

  const validation = makeForgotPasswordValidation();

  const forgotPasswordController = new ForgotPasswordController(
    validation,
    forgotPasswordUsecase
  );

  const forgotPasswordControllerWithLogDecorator = makeLogControllerDecorator(
    forgotPasswordController
  );

  return forgotPasswordControllerWithLogDecorator;
};
