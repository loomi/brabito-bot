import { User } from '@/domain/user';

export interface ListUsersUsecase {
  list(userFilters: ListUsersUsecase.Params): Promise<ListUsersUsecase.Result>;
}

export namespace ListUsersUsecase {
  export type Params = {
    id?: string;
    name?: string;
    discordId?: string;
    createdAt?: { inititalDate: string; finalDate: string };
    updatedAt?: { inititalDate: string; finalDate: string };
    take?: number;
    skip?: number;
    orderBy?: {
      property: string;
      mode: 'asc' | 'desc';
    };
  };
  export type Result = { users: User[]; totalUsers: number };
}
