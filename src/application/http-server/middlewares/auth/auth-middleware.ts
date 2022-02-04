import { Validation } from '@/application/validation/protocols';
import { LoadUserByTokenUsecase } from '@/domain/usecases/auth';

import { LoadUserByTokenInCloudError } from '@/domain/usecases/auth/load-user-by-token-in-cloud/errors';

import { Middleware, HttpResponse } from '@/application/http-server/protocols';

import {
  forbidden,
  ok,
  serverError,
  unauthorized,
} from '@/application/http-server/helpers/http-helper';

export class AuthMiddleware implements Middleware {
  private readonly validation: Validation;
  private readonly loadUserByTokenUsecase: LoadUserByTokenUsecase;
  private readonly role: 'ADMIN' | 'USER';

  constructor(
    validation: Validation,
    loadUserByTokenUsecase: LoadUserByTokenUsecase,
    role: 'ADMIN' | 'USER'
  ) {
    this.validation = validation;
    this.loadUserByTokenUsecase = loadUserByTokenUsecase;
    this.role = role;
  }

  async handle(request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const hasErros = this.validation.validate(request);
      if (hasErros) return unauthorized(hasErros);

      const { accessToken } = request;

      const tokenWithoutBearer = accessToken.replace('Bearer ', '');

      const user = await this.loadUserByTokenUsecase.loadUser({
        token: tokenWithoutBearer,
      });

      if (!user) return forbidden();

      const { isAdmin } = user;

      if (!isAdmin && this.role === 'ADMIN') {
        return unauthorized();
      }

      return ok({ userRequester: user });
    } catch (error) {
      const catchedError = error as Error;

      if (error instanceof LoadUserByTokenInCloudError) {
        return unauthorized(catchedError);
      }

      return serverError(catchedError);
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken: string;
  };
}
