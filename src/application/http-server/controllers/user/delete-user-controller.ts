import { Controller, HttpResponse } from '@/application/http-server/protocols';

import {
  badRequest,
  conflict,
  ok,
  serverError,
} from '@/application/http-server/helpers/http-helper';

import { Validation } from '@/application/validation/protocols';
import { DeleteUserFromDatabaseUsecase } from '@/domain/usecases/user';
import { DeleteUserFromDatabaseError } from '@/domain/usecases/user/delete-user-from-database/errors';

export class DeleteUserController implements Controller {
  private readonly validation: Validation;
  private readonly deleteUserFromDatabaseUsecase: DeleteUserFromDatabaseUsecase;

  constructor(
    validation: Validation,
    deleteUserFromDatabaseUsecase: DeleteUserFromDatabaseUsecase
  ) {
    this.validation = validation;
    this.deleteUserFromDatabaseUsecase = deleteUserFromDatabaseUsecase;
  }

  async handle(
    httpRequest: DeleteUserController.Request
  ): Promise<HttpResponse> {
    try {
      const hasError = this.validation.validate(httpRequest);

      if (hasError) return badRequest(hasError);

      await this.deleteUserFromDatabaseUsecase.delete(httpRequest);

      return ok();
    } catch (error) {
      const catchedError = error as Error;

      if (error instanceof DeleteUserFromDatabaseError) {
        return conflict(catchedError);
      }

      return serverError(catchedError);
    }
  }
}

export namespace DeleteUserController {
  export type Request = DeleteUserFromDatabaseUsecase.Params;
}
