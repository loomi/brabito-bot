import { Controller } from '@/application/http-server/protocols';
import { ProjectUpdateController } from '@/application/http-server/controllers';
import { makePrWebhookHandler } from '../usecases/pr';

export const makeProjectUpdateController = (): Controller => {
  const prWebhookHandler = makePrWebhookHandler();

  const projectUpdateController = new ProjectUpdateController(prWebhookHandler);

  return projectUpdateController;
};
