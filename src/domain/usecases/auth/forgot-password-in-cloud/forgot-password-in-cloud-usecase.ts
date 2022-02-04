export interface ForgotPasswordInCloudUsecase {
  forgotPassword(
    forgotParams: ForgotPasswordInCloudUsecase.Params
  ): Promise<ForgotPasswordInCloudUsecase.Result>;
}

export namespace ForgotPasswordInCloudUsecase {
  export type Params = {
    email: string;
  };

  export type Result = void;
}
