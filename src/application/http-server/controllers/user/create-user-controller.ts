import { Controller, HttpResponse } from '@/application/http-server/protocols';

import {
  badRequest,
  conflict,
  created,
  serverError,
} from '@/application/http-server/helpers/http-helper';

import { Validation } from '@/application/validation/protocols';
import { CreateUserInDatabaseAndCloudUsecase } from '@/domain/usecases/user';
import { CreateUserInDatabaseError } from '@/domain/usecases/user/create-user-in-database/errors';
import { CreateUserInCloudError } from '@/domain/usecases/user/create-user-in-cloud/errors';

export class CreateUserController implements Controller {
  private readonly validation: Validation;
  private readonly createUserInDatabaseAndCloudUsecase: CreateUserInDatabaseAndCloudUsecase;

  constructor(
    validation: Validation,
    createUserInDatabaseAndCloudUsecase: CreateUserInDatabaseAndCloudUsecase
  ) {
    this.validation = validation;
    this.createUserInDatabaseAndCloudUsecase =
      createUserInDatabaseAndCloudUsecase;
  }

  async handle(
    httpRequest: CreateUserController.Request
  ): Promise<HttpResponse> {
    try {
      const hasError = this.validation.validate(httpRequest);

      if (hasError) return badRequest(hasError);

      const newUser = await this.createUserInDatabaseAndCloudUsecase.create(
        httpRequest
      );

      return created(newUser);
    } catch (error) {
      const catchedError = error as Error;

      if (
        error instanceof CreateUserInDatabaseError ||
        error instanceof CreateUserInCloudError
      ) {
        return conflict(catchedError);
      }

      return serverError(catchedError);
    }
  }
}

export namespace CreateUserController {
  export type Request = CreateUserInDatabaseAndCloudUsecase.Params;
}
