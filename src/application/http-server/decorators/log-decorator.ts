import { Controller, HttpResponse } from '@/application/http-server/protocols';

import {
  LoggerErrorCloud,
  LoggerLocal,
} from '@/domain/usecases/protocols/logs';

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller;
  private readonly loggerErrorCloud: LoggerErrorCloud;
  private readonly loggerLocal: LoggerLocal;

  constructor(
    controller: Controller,
    loggerErrorCloud: LoggerErrorCloud,
    loggerLocal: LoggerLocal
  ) {
    this.controller = controller;
    this.loggerErrorCloud = loggerErrorCloud;
    this.loggerLocal = loggerLocal;
  }

  async handle(httRequest: any): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httRequest);

    if (httpResponse.statusCode >= 500) {
      this.loggerErrorCloud.log(httpResponse.body);
      this.loggerLocal.logError(httpResponse.body);
    }

    return httpResponse;
  }
}
