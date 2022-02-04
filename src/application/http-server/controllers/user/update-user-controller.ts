import { Controller, HttpResponse } from '@/application/http-server/protocols';

import {
  badRequest,
  conflict,
  serverError,
  updated,
} from '@/application/http-server/helpers/http-helper';

import { Validation } from '@/application/validation/protocols';
import { UpdateUserInDatabaseUsecase } from '@/domain/usecases/user';
import { UpdateUserInDatabaseError } from '@/domain/usecases/user/update-user-in-database/errors';

export class UpdateUserController implements Controller {
  private readonly validation: Validation;
  private readonly updateUserInDatabaseUsecase: UpdateUserInDatabaseUsecase;

  constructor(
    validation: Validation,
    updateUserInDatabaseUsecase: UpdateUserInDatabaseUsecase
  ) {
    this.validation = validation;
    this.updateUserInDatabaseUsecase = updateUserInDatabaseUsecase;
  }

  async handle(
    httpRequest: UpdateUserController.Request
  ): Promise<HttpResponse> {
    try {
      const hasError = this.validation.validate(httpRequest);

      if (hasError) return badRequest(hasError);

      const userUpdated = await this.updateUserInDatabaseUsecase.update(
        httpRequest
      );

      return updated(userUpdated);
    } catch (error) {
      const catchedError = error as Error;

      if (error instanceof UpdateUserInDatabaseError) {
        return conflict(catchedError);
      }

      return serverError(catchedError);
    }
  }
}

export namespace UpdateUserController {
  export type Request = UpdateUserInDatabaseUsecase.Params;
}
