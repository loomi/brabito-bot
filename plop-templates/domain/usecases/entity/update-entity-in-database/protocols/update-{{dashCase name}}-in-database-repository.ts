import { Update{{pascalCase name}}InDatabaseUsecase } from '../update-{{dashCase name}}-in-database-usecase';

export interface Update{{pascalCase name}}InDatabaseRepository {
  update(
    {{camelCase name}}Filters: Update{{pascalCase name}}InDatabaseRepository.Params
  ): Promise<Update{{pascalCase name}}InDatabaseRepository.Result>;
}

export namespace Update{{pascalCase name}}InDatabaseRepository {
  export type Params = Omit<
    Update{{pascalCase name}}InDatabaseUsecase.Params,
    'userRequester'
  >;
  export type Result = void;
}
