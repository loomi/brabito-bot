export interface CreateUserInCloudUsecase {
  create(
    userParams: CreateUserInCloudUsecase.Params
  ): Promise<CreateUserInCloudUsecase.Result>;
}

export namespace CreateUserInCloudUsecase {
  export type Params = {
    email: string;
  };

  export type Result = void;
}
