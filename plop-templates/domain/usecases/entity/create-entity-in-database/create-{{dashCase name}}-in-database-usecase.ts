import { {{pascalCase name}}Data, {{pascalCase name}}Input } from '@/domain/entities/{{dashCase name}}';
import { User } from '@/domain/entities'

export interface Create{{pascalCase name}}InDatabaseUsecase {
  create(
    {{camelCase name}}Params: Create{{pascalCase name}}InDatabaseUsecase.Params
  ): Promise<Create{{pascalCase name}}InDatabaseUsecase.Result>;
}

export namespace Create{{pascalCase name}}InDatabaseUsecase {
  export type Params = Omit<{{pascalCase name}}Input, 'id'> & { userRequester?: User };
  export type Result = {{pascalCase name}}Data;
}
