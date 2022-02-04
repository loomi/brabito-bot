import { {{pascalCase name}}Data } from '@/domain/entities/{{dashCase name}}';
import { List{{pascalCase name}}sFromDatabaseUsecase } from '../list-{{dashCase name}}s-from-database-usecase';

export interface List{{pascalCase name}}sFromDatabaseRepository {
  list(
    {{camelCase name}}Filters: List{{pascalCase name}}sFromDatabaseRepository.Params
  ): Promise<List{{pascalCase name}}sFromDatabaseRepository.Result>;
}

export namespace List{{pascalCase name}}sFromDatabaseRepository {
  export type Params = Omit<
    List{{pascalCase name}}sFromDatabaseUsecase.Params,
    'userRequester'
  >;
  export type Result = { {{camelCase name}}s: {{pascalCase name}}Data[]; total{{pascalCase name}}s: number };
}
