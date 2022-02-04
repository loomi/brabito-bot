import { List{{pascalCase name}}sFromDatabaseUsecase } from './list-{{dashCase name}}s-from-database-usecase';
import { List{{pascalCase name}}sFromDatabaseRepository } from './protocols';

type Liste{{pascalCase name}}Injectables = {
  list{{pascalCase name}}sFromDatabaseRepository: List{{pascalCase name}}sFromDatabaseRepository;
};

class List{{pascalCase name}}sFromDatabase implements List{{pascalCase name}}sFromDatabaseUsecase {
  private readonly list{{pascalCase name}}sFromDatabaseRepository: List{{pascalCase name}}sFromDatabaseRepository;

  constructor({ list{{pascalCase name}}sFromDatabaseRepository }: Liste{{pascalCase name}}Injectables) {
    this.list{{pascalCase name}}sFromDatabaseRepository = list{{pascalCase name}}sFromDatabaseRepository;
  }

  async list(
    {{camelCase name}}Filters: List{{pascalCase name}}sFromDatabaseUsecase.Params
  ): Promise<List{{pascalCase name}}sFromDatabaseUsecase.Result> {
    const { userRequester, ...rest{{pascalCase name}}Filters } = {{camelCase name}}Filters;

    const { {{camelCase name}}s, total{{pascalCase name}}s } =
      await this.list{{pascalCase name}}sFromDatabaseRepository.list(rest{{pascalCase name}}Filters);

    return { {{camelCase name}}s, total{{pascalCase name}}s };
  }
}

export { List{{pascalCase name}}sFromDatabase };
