export interface ForgotPasswordInCloudProvider {
  forgotPassword(
    userParams: ForgotPasswordInCloudProvider.Params
  ): Promise<ForgotPasswordInCloudProvider.Result>;
}

export namespace ForgotPasswordInCloudProvider {
  export type Params = {
    email: string;
  };

  export type Result = void;
}
