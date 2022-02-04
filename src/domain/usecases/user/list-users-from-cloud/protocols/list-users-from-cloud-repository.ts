export interface ListUsersFromCloudRepository {
  list(
    usersFilters: ListUsersFromCloudRepository.Params
  ): Promise<ListUsersFromCloudRepository.Result>;
}

export namespace ListUsersFromCloudRepository {
  export type Params = { email: string };
  export type Result = {
    usersFromCloud: {
      enabled: string;
      username: string;
      status: string;
      email: string;
    }[];
  };
}
