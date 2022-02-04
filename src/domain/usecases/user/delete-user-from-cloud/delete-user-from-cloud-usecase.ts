export interface DeleteUserFromCloudUsecase {
  delete(
    userParams: DeleteUserFromCloudUsecase.Params
  ): Promise<DeleteUserFromCloudUsecase.Result>;
}

export namespace DeleteUserFromCloudUsecase {
  export type Params = { email: string };
  export type Result = void;
}
