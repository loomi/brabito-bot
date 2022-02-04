export interface DeleteUserFromCloudRepository {
  delete(
    userParams: DeleteUserFromCloudRepository.Params
  ): Promise<DeleteUserFromCloudRepository.Result>;
}

export namespace DeleteUserFromCloudRepository {
  export type Params = { email: string };
  export type Result = void;
}
