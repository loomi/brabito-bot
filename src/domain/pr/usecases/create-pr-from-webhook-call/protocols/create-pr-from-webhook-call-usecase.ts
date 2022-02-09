import { Pr } from '@/domain/pr';

export interface CreatePrFromWebhookCallUsecase {
  create(
    prParams: CreatePrFromWebhookCallUsecase.Params
  ): Promise<CreatePrFromWebhookCallUsecase.Result>;
}

export namespace CreatePrFromWebhookCallUsecase {
  export type Params = any;
  export type Result = Pr;
}
