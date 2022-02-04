export interface GetRefreshTokenInCloudProvider {
  get(
    tokenParams: GetRefreshTokenInCloudProvider.Params
  ): Promise<GetRefreshTokenInCloudProvider.Result>;
}

export namespace GetRefreshTokenInCloudProvider {
  export type Params = {
    refreshToken: string;
  };

  export type Result = { accessToken: string; refreshToken: string };
}
