import { {{pascalCase name}}Data } from '@/domain/entities/{{dashCase name}}';
import { User } from '@/domain/entities'

export interface List{{pascalCase name}}sFromDatabaseUsecase {
  list(
    {{camelCase name}}Filters: List{{pascalCase name}}sFromDatabaseUsecase.Params
  ): Promise<List{{pascalCase name}}sFromDatabaseUsecase.Result>;
}

export namespace List{{pascalCase name}}sFromDatabaseUsecase {
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
  export type Result = { {{camelCase name}}s: {{pascalCase name}}Data[]; total{{pascalCase name}}s: number };
}
