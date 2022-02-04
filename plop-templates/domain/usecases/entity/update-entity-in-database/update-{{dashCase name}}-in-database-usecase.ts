import { User } from '@/domain/entities';
import { {{pascalCase name}}Data } from '@/domain/entities/{{dashCase name}}'

export interface Update{{pascalCase name}}InDatabaseUsecase {
  update(
    {{camelCase name}}Params: Update{{pascalCase name}}InDatabaseUsecase.Params
  ): Promise<Update{{pascalCase name}}InDatabaseUsecase.Result>;
}

export namespace Update{{pascalCase name}}InDatabaseUsecase {
  export type Params = {
    userRequester: User;
    id: string;
    isAdmin?: boolean;
    name?: string;
    email?: string;
    enabled?: boolean;
  };

  export type Result = {{pascalCase name}}Data | Error;
}
