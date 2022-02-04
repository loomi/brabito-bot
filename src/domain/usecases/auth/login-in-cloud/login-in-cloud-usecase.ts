import { UserData } from '@/domain/entities';

export interface LoginInCloudUsecase {
  login(
    loginParams: LoginInCloudUsecase.Params
  ): Promise<LoginInCloudUsecase.Result>;
}

export namespace LoginInCloudUsecase {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    accessToken: string;
    refreshToken: string;
    user: UserData;
  };
}
