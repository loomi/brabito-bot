export interface LoadUserByTokenInCloudProvider {
  loadUser(
    loadUserParams: LoadUserByTokenInCloudProvider.Params
  ): Promise<LoadUserByTokenInCloudProvider.Result>;
}

export namespace LoadUserByTokenInCloudProvider {
  export type Params = {
    token: string;
  };

  export type Result = {
    username: string;
    email: string;
  };
}
