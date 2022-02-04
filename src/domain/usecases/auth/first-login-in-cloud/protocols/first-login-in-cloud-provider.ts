export interface FirstLoginInCloudProvider {
  login(
    userParams: FirstLoginInCloudProvider.Params
  ): Promise<FirstLoginInCloudProvider.Result>;
}

export namespace FirstLoginInCloudProvider {
  export type Params = {
    email: string;
    newPassword: string;
    temporaryPassword: string;
  };

  export type Result = void | Error;
}
