import { Controller } from '@/application/http-server/protocols';
import { makeLogControllerDecorator } from '@/main/factories/controllers';
import { makeConfirmForgotPasswordInCloudUsecase } from '@/main/factories/usecases/auth';
import { makeConfirmForgotPasswordValidation } from '@/main/factories/validation/auth';
import { ConfirmForgotPasswordController } from '@/application/http-server/controllers/auth';

export const makeConfirmForgotPasswordController = (): Controller => {
  const confirmForgotPasswordUsecase =
    makeConfirmForgotPasswordInCloudUsecase();

  const validation = makeConfirmForgotPasswordValidation();

  const confirmForgotPasswordController = new ConfirmForgotPasswordController(
    validation,
    confirmForgotPasswordUsecase
  );

  const confirmForgotPasswordControllerWithLogDecorator =
    makeLogControllerDecorator(confirmForgotPasswordController);

  return confirmForgotPasswordControllerWithLogDecorator;
};
