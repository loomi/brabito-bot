import { Controller, HttpResponse } from '@/application/http-server/protocols';

import {
  badRequest,
  conflict,
  ok,
  serverError,
} from '@/application/http-server/helpers/http-helper';

import { Validation } from '@/application/validation/protocols';
import {
  ConfirmForgotPasswordInCloudUsecase,
  ConfirmForgotPasswordInCloudError,
} from '@/domain/usecases/auth';

export class ConfirmForgotPasswordController implements Controller {
  private readonly validation: Validation;
  private readonly confirmForgotPasswordInCloudUsecase: ConfirmForgotPasswordInCloudUsecase;

  constructor(
    validation: Validation,
    confirmForgotPasswordInCloudUsecase: ConfirmForgotPasswordInCloudUsecase
  ) {
    this.validation = validation;
    this.confirmForgotPasswordInCloudUsecase =
      confirmForgotPasswordInCloudUsecase;
  }

  async handle(
    httpRequest: ConfirmForgotPasswordController.Request
  ): Promise<HttpResponse> {
    try {
      const hasError = this.validation.validate(httpRequest);

      if (hasError) return badRequest(hasError);

      const { accessToken, refreshToken } =
        await this.confirmForgotPasswordInCloudUsecase.confirmForgotPassword(
          httpRequest
        );

      return ok({ accessToken, refreshToken });
    } catch (error) {
      const catchedError = error as Error;

      if (error instanceof ConfirmForgotPasswordInCloudError) {
        return conflict(catchedError);
      }

      return serverError(catchedError);
    }
  }
}

export namespace ConfirmForgotPasswordController {
  export type Request = ConfirmForgotPasswordInCloudUsecase.Params;
}
