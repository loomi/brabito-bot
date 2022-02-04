export interface LoginInCloudProvider {
  login(
    loginParams: LoginInCloudProvider.Params
  ): Promise<LoginInCloudProvider.Result>;
}

export namespace LoginInCloudProvider {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    accessToken: string;
    refreshToken: string;
  };
}
