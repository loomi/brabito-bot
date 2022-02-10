import { PrWebhookHandler } from '@/domain/pr/usecases/pr-webhook-handler/protocols';
import { PrsWebhookHandler } from '@/domain/pr/usecases/pr-webhook-handler';
import { PrismaListPrsFromDatabaseRepository } from '@/infra/database/orm/prisma/repositories/pr';

import { makeCreatePrFromWebhookCall, makeUpdatePrFromWebhookCall } from '.';

export const makePrWebhookHandler = (): PrWebhookHandler => {
  const listPrsFromDatabaseRepository =
    new PrismaListPrsFromDatabaseRepository();

  const createPrFromWebhookCall = makeCreatePrFromWebhookCall();
  const updatePrFromWebhookCall = makeUpdatePrFromWebhookCall();

  return new PrsWebhookHandler({
    createPrFromWebhookCall,
    updatePrFromWebhookCall,
    listPrsFromDatabaseRepository,
  });
};
