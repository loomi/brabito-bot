import { User, UserData, UserInput } from '@/domain/entities/user';

export interface CreateUserInDatabaseUsecase {
  create(
    userParams: CreateUserInDatabaseUsecase.Params
  ): Promise<CreateUserInDatabaseUsecase.Result>;
}

export namespace CreateUserInDatabaseUsecase {
  export type Params = Omit<UserInput, 'id'> & { userRequester?: User };
  export type Result = UserData;
}
