import { User } from '@/domain/user';

export interface CreateUserInDatabaseRepository {
  createUser(
    UserParams: CreateUserInDatabaseRepository.Params
  ): Promise<CreateUserInDatabaseRepository.Result>;
}

export namespace CreateUserInDatabaseRepository {
  export type Params = User;
  export type Result = void;
}
