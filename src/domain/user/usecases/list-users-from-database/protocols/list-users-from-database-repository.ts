import { UserData } from '@/domain/user';
import { ListUsersUsecase } from './list-users-from-database-usecase';

export interface ListUsersInDatabaseRepository {
  listUser(
    userFilters: ListUsersInDatabaseRepository.Params
  ): Promise<ListUsersInDatabaseRepository.Result>;
}

export namespace ListUsersInDatabaseRepository {
  export type Params = ListUsersUsecase.Params;
  export type Result = { users: UserData[]; totalUsers: number };
}
