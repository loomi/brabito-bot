export interface LoadUserByTokenInCloudUsecase {
  loadUser(
    loadUserParams: LoadUserByTokenInCloudUsecase.Params
  ): Promise<LoadUserByTokenInCloudUsecase.Result>;
}

export namespace LoadUserByTokenInCloudUsecase {
  export type Params = {
    token: string;
  };

  export type Result = {
    username: string;
    email: string;
  };
}
