import { Pr } from '@/domain/pr';

export interface UpdatePrInDatabaseRepository {
  updatePr(
    prParams: UpdatePrInDatabaseRepository.Params
  ): Promise<UpdatePrInDatabaseRepository.Result>;
}

export namespace UpdatePrInDatabaseRepository {
  export type Params = Pr;
  export type Result = void;
}
