import {
  Delete{{pascalCase name}}FromDatabaseUsecase,
  List{{pascalCase name}}sFromDatabaseUsecase,
} from '@/domain/usecases/{{dashCase name}}';
import { Delete{{pascalCase name}}FromDatabaseError } from './errors';
import { Delete{{pascalCase name}}FromDatabaseRepository } from './protocols';

type Delete{{pascalCase name}}Injectables = {
  list{{pascalCase name}}sFromDatabaseUsecase: List{{pascalCase name}}sFromDatabaseUsecase;
  delete{{pascalCase name}}FromDatabaseRepository: Delete{{pascalCase name}}FromDatabaseRepository;
};

class Delete{{pascalCase name}}FromDatabase implements Delete{{pascalCase name}}FromDatabaseUsecase {
  private readonly list{{pascalCase name}}sFromDatabaseUsecase: List{{pascalCase name}}sFromDatabaseUsecase;
  private readonly delete{{pascalCase name}}FromDatabaseRepository: Delete{{pascalCase name}}FromDatabaseRepository;

  constructor({
    list{{pascalCase name}}sFromDatabaseUsecase,
    delete{{pascalCase name}}FromDatabaseRepository,
  }: Delete{{pascalCase name}}Injectables) {
    this.list{{pascalCase name}}sFromDatabaseUsecase = list{{pascalCase name}}sFromDatabaseUsecase;
    this.delete{{pascalCase name}}FromDatabaseRepository = delete{{pascalCase name}}FromDatabaseRepository;
  }

  async delete(
    {{camelCase name}}Params: Delete{{pascalCase name}}FromDatabaseUsecase.Params
  ): Promise<Delete{{pascalCase name}}FromDatabaseUsecase.Result> {
    const { userRequester, id } = {{camelCase name}}Params;

    const { total{{pascalCase name}}s } = await this.list{{pascalCase name}}sFromDatabaseUsecase.list({
      userRequester,
      id,
    });

    if (total{{pascalCase name}}s === 0) {
      throw new Delete{{pascalCase name}}FromDatabaseError(`{{pascalCase name}} not found in database`);
    }

    await this.delete{{pascalCase name}}FromDatabaseRepository.delete({ id });
  }
}

export { Delete{{pascalCase name}}FromDatabase };
