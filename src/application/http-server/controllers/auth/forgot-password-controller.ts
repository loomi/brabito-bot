import { Controller, HttpResponse } from '@/application/http-server/protocols';

import {
  badRequest,
  conflict,
  ok,
  serverError,
} from '@/application/http-server/helpers/http-helper';

import { Validation } from '@/application/validation/protocols';
import { ForgotPasswordInCloudUsecase } from '@/domain/usecases/auth';
import { ForgotPasswordInCloudError } from '@/domain/usecases/auth/forgot-password-in-cloud/errors';

export class ForgotPasswordController implements Controller {
  private readonly validation: Validation;
  private readonly forgotPasswordInCloudUsecase: ForgotPasswordInCloudUsecase;

  constructor(
    validation: Validation,
    forgotPasswordInCloudUsecase: ForgotPasswordInCloudUsecase
  ) {
    this.validation = validation;
    this.forgotPasswordInCloudUsecase = forgotPasswordInCloudUsecase;
  }

  async handle(
    httpRequest: ForgotPasswordController.Request
  ): Promise<HttpResponse> {
    try {
      const hasError = this.validation.validate(httpRequest);

      if (hasError) return badRequest(hasError);

      await this.forgotPasswordInCloudUsecase.forgotPassword(httpRequest);

      return ok();
    } catch (error) {
      const catchedError = error as Error;

      if (error instanceof ForgotPasswordInCloudError) {
        return conflict(catchedError);
      }

      return serverError(catchedError);
    }
  }
}

export namespace ForgotPasswordController {
  export type Request = ForgotPasswordInCloudUsecase.Params;
}
