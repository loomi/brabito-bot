import { Controller, HttpResponse } from '@/application/http-server/protocols';

import {
  badRequest,
  conflict,
  ok,
  serverError,
} from '@/application/http-server/helpers/http-helper';

import { Validation } from '@/application/validation/protocols';
import { FirstLoginInCloudUsecase } from '@/domain/usecases/auth';
import { FirstLoginInCloudError } from '@/domain/usecases/auth/first-login-in-cloud/errors';

export class FirstLoginController implements Controller {
  private readonly validation: Validation;
  private readonly firstLoginInCloudUsecase: FirstLoginInCloudUsecase;

  constructor(
    validation: Validation,
    firstLoginInCloudUsecase: FirstLoginInCloudUsecase
  ) {
    this.validation = validation;
    this.firstLoginInCloudUsecase = firstLoginInCloudUsecase;
  }

  async handle(
    httpRequest: FirstLoginController.Request
  ): Promise<HttpResponse> {
    try {
      const hasError = this.validation.validate(httpRequest);

      if (hasError) return badRequest(hasError);

      const { accessToken, refreshToken } =
        await this.firstLoginInCloudUsecase.firstLogin(httpRequest);

      return ok({ accessToken, refreshToken });
    } catch (error) {
      const catchedError = error as Error;

      if (error instanceof FirstLoginInCloudError) {
        return conflict(catchedError);
      }

      return serverError(catchedError);
    }
  }
}

export namespace FirstLoginController {
  export type Request = FirstLoginInCloudUsecase.Params;
}
