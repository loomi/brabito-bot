export interface SaveUserInCloudRepository {
  save(
    userParams: SaveUserInCloudRepository.Params
  ): Promise<SaveUserInCloudRepository.Result>;
}

export namespace SaveUserInCloudRepository {
  export type Params = {
    email: string;
  };
  export type Result = void;
}
