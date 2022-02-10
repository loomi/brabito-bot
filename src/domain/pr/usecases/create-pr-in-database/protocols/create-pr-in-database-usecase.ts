import { Pr, PrInput } from '@/domain/pr';

export interface CreatePrUsecase {
  create(prParams: CreatePrUsecase.Params): Promise<CreatePrUsecase.Result>;
}

export namespace CreatePrUsecase {
  export type Params = Omit<PrInput, 'id'>;
  export type Result = Pr;
}
