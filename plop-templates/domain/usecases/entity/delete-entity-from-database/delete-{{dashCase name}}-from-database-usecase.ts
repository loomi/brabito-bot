import { User } from '@/domain/entities';

export interface Delete{{pascalCase name}}FromDatabaseUsecase {
  delete(
    {{camelCase name}}Params: Delete{{pascalCase name}}FromDatabaseUsecase.Params
  ): Promise<Delete{{pascalCase name}}FromDatabaseUsecase.Result>;
}

export namespace Delete{{pascalCase name}}FromDatabaseUsecase {
  export type Params = {
    id: string;
    userRequester: User;
  };
  export type Result = void;
}
