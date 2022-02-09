import { Controller, HttpResponse } from '@/application/http-server/protocols';

import { ok, serverError } from '@/application/http-server/helpers';
import { PrWebhookHandler } from '@/domain/pr/usecases/pr-webhook-handler/protocols';

export class ProjectUpdateController implements Controller {
  private readonly prsWebhookHandler: PrWebhookHandler;
  constructor(prsWebhookHandler: PrWebhookHandler) {
    this.prsWebhookHandler = prsWebhookHandler;
  }

  async handle(httpRequest: any): Promise<HttpResponse> {
    try {
      await this.prsWebhookHandler.createOrUpdatePr(httpRequest);

      return ok();
    } catch (error) {
      const catchedError = error as Error;

      return serverError(catchedError);
    }
  }
}
