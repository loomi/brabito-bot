import { List{{pascalCase name}}sFromDatabaseUsecase } from '@/domain/usecases/{{dashCase name}}';

import { Update{{pascalCase name}}InDatabaseError } from './errors';
import { Update{{pascalCase name}}InDatabaseUsecase } from './update-{{dashCase name}}-in-database-usecase';
import { Update{{pascalCase name}}InDatabaseRepository } from './protocols';
import { {{pascalCase name}} } from '@/domain/entities';

type Update{{pascalCase name}}InDatabaseInjectables = {
  list{{pascalCase name}}sFromDatabaseUsecase: List{{pascalCase name}}sFromDatabaseUsecase;
  update{{pascalCase name}}InDatabaseRepository: Update{{pascalCase name}}InDatabaseRepository;
};

class Update{{pascalCase name}}InDatabase implements Update{{pascalCase name}}InDatabaseUsecase {
  private readonly list{{pascalCase name}}sFromDatabaseUsecase: List{{pascalCase name}}sFromDatabaseUsecase;
  private readonly update{{pascalCase name}}InDatabaseRepository: Update{{pascalCase name}}InDatabaseRepository;

  constructor({
    list{{pascalCase name}}sFromDatabaseUsecase,
    update{{pascalCase name}}InDatabaseRepository,
  }: Update{{pascalCase name}}InDatabaseInjectables) {
    this.list{{pascalCase name}}sFromDatabaseUsecase = list{{pascalCase name}}sFromDatabaseUsecase;
    this.update{{pascalCase name}}InDatabaseRepository = update{{pascalCase name}}InDatabaseRepository;
  }

  async update(
    {{camelCase name}}Params: Update{{pascalCase name}}InDatabaseUsecase.Params
  ): Promise<Update{{pascalCase name}}InDatabaseUsecase.Result> {
    const { id, userRequester, ...paramsToUpdate{{pascalCase name}} } = {{camelCase name}}Params;

    const { {{camelCase name}}s, total{{pascalCase name}}s } = await this.list{{pascalCase name}}sFromDatabaseUsecase.list({
      userRequester,
      id,
    });

    if (total{{pascalCase name}}s === 0) {
      throw new Update{{pascalCase name}}InDatabaseError('{{pascalCase name}} not found');
    }

    const [{{camelCase name}}] = {{camelCase name}}s;

    const {{camelCase name}}ToBeUpdated = new {{pascalCase name}}({{camelCase name}});

    for (const [param, value] of Object.entries(paramsToUpdate{{pascalCase name}})) {
      if (param === 'name') {
        {{camelCase name}}ToBeUpdated.updateName(value);
      }
    }

    const {{camelCase name}}ToBeUpdatedData = {{camelCase name}}ToBeUpdated.toJSON();

    await this.update{{pascalCase name}}InDatabaseRepository.update({{camelCase name}}ToBeUpdatedData);

    return {{camelCase name}}ToBeUpdatedData;
  }
}

export { Update{{pascalCase name}}InDatabase };
