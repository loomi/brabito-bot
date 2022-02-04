export interface FirstLoginInCloudUsecase {
  firstLogin(
    loginParams: FirstLoginInCloudUsecase.Params
  ): Promise<FirstLoginInCloudUsecase.Result>;
}

export namespace FirstLoginInCloudUsecase {
  export type Params = {
    email: string;
    newPassword: string;
    temporaryPassword: string;
  };

  export type Result = {
    accessToken: string;
    refreshToken: string;
  };
}
