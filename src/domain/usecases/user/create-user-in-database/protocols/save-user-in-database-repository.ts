import { UserData } from '@/domain/entities/user';

export interface SaveUserInDatabaseRepository {
  save(
    userParams: SaveUserInDatabaseRepository.Params
  ): Promise<SaveUserInDatabaseRepository.Result>;
}

export namespace SaveUserInDatabaseRepository {
  export type Params = UserData;
  export type Result = void;
}
