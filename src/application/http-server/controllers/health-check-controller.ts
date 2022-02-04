import { Controller, HttpResponse } from '@/application/http-server/protocols';

import { ok, serverError } from '@/application/http-server/helpers';

export class HealthCheckController implements Controller {
  async handle(httpRequest: any): Promise<HttpResponse> {
    try {
      return ok();
    } catch (error) {
      const catchedError = error as Error;

      return serverError(catchedError);
    }
  }
}
