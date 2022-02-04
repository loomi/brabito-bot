import { {{pascalCase name}}Data } from '@/domain/entities/{{dashCase name}}';

export interface Save{{pascalCase name}}InDatabaseRepository {
  save(
    {{camelCase name}}Params: Save{{pascalCase name}}InDatabaseRepository.Params
  ): Promise<Save{{pascalCase name}}InDatabaseRepository.Result>;
}

export namespace Save{{pascalCase name}}InDatabaseRepository {
  export type Params = {{pascalCase name}}Data;
  export type Result = void;
}
