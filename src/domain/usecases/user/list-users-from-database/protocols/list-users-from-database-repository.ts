import { UserData } from '@/domain/entities/user';
import { ListUsersFromDatabaseUsecase } from '../list-users-from-database-usecase';

export interface ListUsersFromDatabaseRepository {
  list(
    userFilters: ListUsersFromDatabaseRepository.Params
  ): Promise<ListUsersFromDatabaseRepository.Result>;
}

export namespace ListUsersFromDatabaseRepository {
  export type Params = Omit<
    ListUsersFromDatabaseUsecase.Params,
    'userRequester'
  >;
  export type Result = { users: UserData[]; totalUsers: number };
}
