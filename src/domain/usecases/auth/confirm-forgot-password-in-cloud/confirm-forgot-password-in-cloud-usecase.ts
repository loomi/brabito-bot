export interface ConfirmForgotPasswordInCloudUsecase {
  confirmForgotPassword(
    confirmParams: ConfirmForgotPasswordInCloudUsecase.Params
  ): Promise<ConfirmForgotPasswordInCloudUsecase.Result>;
}

export namespace ConfirmForgotPasswordInCloudUsecase {
  export type Params = {
    email: string;
    newPassword: string;
    verificationCode: string;
  };

  export type Result = {
    accessToken: string;
    refreshToken: string;
  };
}
