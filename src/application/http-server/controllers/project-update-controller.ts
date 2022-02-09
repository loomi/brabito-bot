import { Controller, HttpResponse } from '@/application/http-server/protocols';

import { ok, serverError } from '@/application/http-server/helpers';

export class ProjectUpdateController implements Controller {
  async handle(httpRequest: any): Promise<HttpResponse> {
    try {
      console.log('--------------------------------------------------------');
      console.log(httpRequest);
      return ok();
    } catch (error) {
      const catchedError = error as Error;

      return serverError(catchedError);
    }
  }
}
