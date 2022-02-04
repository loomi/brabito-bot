export interface DeleteUserFromDatabaseRepository {
  delete(
    userParams: DeleteUserFromDatabaseRepository.Params
  ): Promise<DeleteUserFromDatabaseRepository.Result>;
}

export namespace DeleteUserFromDatabaseRepository {
  export type Params = { id: string };
  export type Result = void;
}
