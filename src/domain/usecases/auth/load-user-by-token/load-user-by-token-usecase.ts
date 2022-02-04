import { UserData } from '@/domain/entities';

export interface LoadUserByTokenUsecase {
  loadUser(
    loadUserParams: LoadUserByTokenUsecase.Params
  ): Promise<LoadUserByTokenUsecase.Result>;
}

export namespace LoadUserByTokenUsecase {
  export type Params = {
    token: string;
  };

  export type Result = UserData;
}
