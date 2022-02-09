import { UpdatePrFromWebhookCallUsecase } from '@/domain/pr/usecases/update-pr-from-webhook-call/protocols';
import { UpdatePrFromWebhookCallService } from '@/domain/pr/usecases/update-pr-from-webhook-call';
import { PrismaUpdatePrInDatabaseRepository } from '@/infra/database/orm/prisma/repositories/pr';

import { makeListPrService } from '.';

export const makeUpdatePrFromWebhookCall =
  (): UpdatePrFromWebhookCallUsecase => {
    const updatePrInDatabaseRepository =
      new PrismaUpdatePrInDatabaseRepository();

    const listPrsUsecase = makeListPrService();

    return new UpdatePrFromWebhookCallService({
      listPrsUsecase,
      updatePrInDatabaseRepository,
    });
  };
