export interface ListUsersFromCloudUsecase {
  list(
    usersFilters: ListUsersFromCloudUsecase.Params
  ): Promise<ListUsersFromCloudUsecase.Result>;
}

export namespace ListUsersFromCloudUsecase {
  export type Params = {
    email: string;
  };

  export type Result = { usersFromCloud: { status: string; email: string }[] };
}
