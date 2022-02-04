import { Controller, HttpResponse } from '@/application/http-server/protocols';

import {
  badRequest,
  ok,
  serverError,
} from '@/application/http-server/helpers/http-helper';

import { Validation } from '@/application/validation/protocols';
import { ListUsersFromDatabaseUsecase } from '@/domain/usecases/user';

export class ListUsersController implements Controller {
  private readonly validation: Validation;
  private readonly listUsersFromDatabaseUsecase: ListUsersFromDatabaseUsecase;

  constructor(
    validation: Validation,
    listUsersFromDatabaseUsecase: ListUsersFromDatabaseUsecase
  ) {
    this.validation = validation;
    this.listUsersFromDatabaseUsecase = listUsersFromDatabaseUsecase;
  }

  async handle(
    httpRequest: ListUsersController.Request
  ): Promise<HttpResponse> {
    try {
      const hasError = this.validation.validate(httpRequest);

      if (hasError) return badRequest(hasError);

      const { users, totalUsers } =
        await this.listUsersFromDatabaseUsecase.list(httpRequest);

      return ok({ users, totalUsers }, 'list');
    } catch (error) {
      const catchedError = error as Error;

      return serverError(catchedError);
    }
  }
}

export namespace ListUsersController {
  export type Request = ListUsersFromDatabaseUsecase.Params;
}
