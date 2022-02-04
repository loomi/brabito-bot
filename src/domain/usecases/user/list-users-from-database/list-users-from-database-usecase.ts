import { User, UserData } from '@/domain/entities/user';

export interface ListUsersFromDatabaseUsecase {
  list(
    userFilters: ListUsersFromDatabaseUsecase.Params
  ): Promise<ListUsersFromDatabaseUsecase.Result>;
}

export namespace ListUsersFromDatabaseUsecase {
  export type Params = {
    userRequester?: User;
    id?: string;
    isAdmin?: boolean;
    enabled?: boolean;
    name?: string;
    email?: string;
    createdAt?: { inititalDate: string; finalDate: string };
    updatedAt?: { inititalDate: string; finalDate: string };
    take?: number;
    skip?: number;
    orderBy?: {
      property: string;
      mode: 'asc' | 'desc';
    };
  };
  export type Result = { users: UserData[]; totalUsers: number };
}
