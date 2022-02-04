import { UpdateUserInDatabaseUsecase } from '../update-user-in-database-usecase';

export interface UpdateUserInDatabaseRepository {
  update(
    userFilters: UpdateUserInDatabaseRepository.Params
  ): Promise<UpdateUserInDatabaseRepository.Result>;
}

export namespace UpdateUserInDatabaseRepository {
  export type Params = Omit<
    UpdateUserInDatabaseUsecase.Params,
    'userRequester'
  >;
  export type Result = void;
}
