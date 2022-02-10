import { Pr } from '@/domain/pr';

export interface CreatePrInDatabaseRepository {
  createPr(
    prParams: CreatePrInDatabaseRepository.Params
  ): Promise<CreatePrInDatabaseRepository.Result>;
}

export namespace CreatePrInDatabaseRepository {
  export type Params = Pr;
  export type Result = void;
}
