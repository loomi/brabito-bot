export interface RefreshTokenInCloudUsecase {
  refresh(
    refreshParams: RefreshTokenInCloudUsecase.Params
  ): Promise<RefreshTokenInCloudUsecase.Result>;
}

export namespace RefreshTokenInCloudUsecase {
  export type Params = {
    refreshToken: string;
  };

  export type Result = {
    accessToken: string;
    refreshToken: string;
  };
}
