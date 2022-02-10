import { CreatePrFromWebhookCallUsecase } from '@/domain/pr/usecases/create-pr-from-webhook-call/protocols';
import { CreatePrFromWebhookCallService } from '@/domain/pr/usecases/create-pr-from-webhook-call';
import { PrismaCreatePrInDatabaseRepository } from '@/infra/database/orm/prisma/repositories/pr';

import { makeUUIDGeneratorAdapter } from '../../infra/uuid';
import { makeSendMessage } from '../send-message';

export const makeCreatePrFromWebhookCall =
  (): CreatePrFromWebhookCallUsecase => {
    const createPrInDatabaseRepository =
      new PrismaCreatePrInDatabaseRepository();

    const UUIDGenerator = makeUUIDGeneratorAdapter();
    const sendMessageService = makeSendMessage();

    return new CreatePrFromWebhookCallService({
      createPrInDatabaseRepository,
      UUIDGenerator,
      sendMessageService,
    });
  };
