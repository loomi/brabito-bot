import { PrData } from '@/domain/pr';
import { ListPrsUsecase } from './list-prs-from-database-usecase';

export interface ListPrsFromDatabaseRepository {
  listPrs(
    prParams: ListPrsFromDatabaseRepository.Params
  ): Promise<ListPrsFromDatabaseRepository.Result>;
}

export namespace ListPrsFromDatabaseRepository {
  export type Params = ListPrsUsecase.Params;
  export type Result = { prs: PrData[]; totalPrs: number };
}
