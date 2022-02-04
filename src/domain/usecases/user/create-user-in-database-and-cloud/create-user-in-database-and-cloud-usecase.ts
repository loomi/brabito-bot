import { User, UserData, UserInput } from '@/domain/entities/user';

export interface CreateUserInDatabaseAndCloudUsecase {
  create(
    userParams: CreateUserInDatabaseAndCloudUsecase.Params
  ): Promise<CreateUserInDatabaseAndCloudUsecase.Result>;
}

export namespace CreateUserInDatabaseAndCloudUsecase {
  export type Params = Omit<UserInput, 'id'> & { userRequester: User };
  export type Result = UserData;
}
