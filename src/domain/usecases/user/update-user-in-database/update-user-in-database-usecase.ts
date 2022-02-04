import { User, UserData } from '@/domain/entities';

export interface UpdateUserInDatabaseUsecase {
  update(
    userParams: UpdateUserInDatabaseUsecase.Params
  ): Promise<UpdateUserInDatabaseUsecase.Result>;
}

export namespace UpdateUserInDatabaseUsecase {
  export type Params = {
    userRequester: User;
    id: string;
    isAdmin?: boolean;
    name?: string;
    email?: string;
    enabled?: boolean;
  };

  export type Result = UserData | Error;
}
