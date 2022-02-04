import { Controller, HttpResponse } from '@/application/http-server/protocols';

import {
  badRequest,
  ok,
  serverError,
} from '@/application/http-server/helpers/http-helper';

import { Validation } from '@/application/validation/protocols';
import { RefreshTokenInCloudUsecase } from '@/domain/usecases/auth';

export class RefreshTokenController implements Controller {
  private readonly validation: Validation;
  private readonly refreshTokenInCloudUsecase: RefreshTokenInCloudUsecase;

  constructor(
    validation: Validation,
    refreshTokenInCloudUsecase: RefreshTokenInCloudUsecase
  ) {
    this.validation = validation;
    this.refreshTokenInCloudUsecase = refreshTokenInCloudUsecase;
  }

  async handle(
    httpRequest: RefreshTokenController.Request
  ): Promise<HttpResponse> {
    try {
      const hasError = this.validation.validate(httpRequest);

      if (hasError) return badRequest(hasError);

      const { accessToken, refreshToken } =
        await this.refreshTokenInCloudUsecase.refresh(httpRequest);

      return ok({ accessToken, refreshToken });
    } catch (error) {
      const catchedError = error as Error;

      return serverError(catchedError);
    }
  }
}

export namespace RefreshTokenController {
  export type Request = RefreshTokenInCloudUsecase.Params;
}
