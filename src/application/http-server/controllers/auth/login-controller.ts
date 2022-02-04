import { Controller, HttpResponse } from '@/application/http-server/protocols';

import {
  badRequest,
  conflict,
  ok,
  serverError,
} from '@/application/http-server/helpers/http-helper';

import { Validation } from '@/application/validation/protocols';
import { LoginInCloudUsecase } from '@/domain/usecases/auth';
import { LoginInCloudError } from '@/domain/usecases/auth/login-in-cloud/errors';

export class LoginController implements Controller {
  private readonly validation: Validation;
  private readonly loginInCloudUsecase: LoginInCloudUsecase;

  constructor(
    validation: Validation,
    loginInCloudUsecase: LoginInCloudUsecase
  ) {
    this.validation = validation;
    this.loginInCloudUsecase = loginInCloudUsecase;
  }

  async handle(httpRequest: LoginController.Request): Promise<HttpResponse> {
    try {
      const hasError = this.validation.validate(httpRequest);

      if (hasError) return badRequest(hasError);

      const { accessToken, refreshToken, user } =
        await this.loginInCloudUsecase.login(httpRequest);

      return ok({ accessToken, refreshToken, user });
    } catch (error) {
      const catchedError = error as Error;

      if (error instanceof LoginInCloudError) {
        return conflict(catchedError);
      }

      return serverError(catchedError);
    }
  }
}

export namespace LoginController {
  export type Request = LoginInCloudUsecase.Params;
}
