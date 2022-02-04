import { User } from '@/domain/entities';

export interface DeleteUserFromDatabaseUsecase {
  delete(
    userParams: DeleteUserFromDatabaseUsecase.Params
  ): Promise<DeleteUserFromDatabaseUsecase.Result>;
}

export namespace DeleteUserFromDatabaseUsecase {
  export type Params = {
    id: string;
    userRequester: User;
  };
  export type Result = void;
}
