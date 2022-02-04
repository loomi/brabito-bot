import { Create{{pascalCase name}}InDatabaseUsecase } from './create-{{dashCase name}}-in-database-usecase';
import { Save{{pascalCase name}}InDatabaseRepository } from './protocols';
import { UUIDGenerator } from '@/domain/usecases/protocols/uuid';
import { {{pascalCase name}} } from '@/domain/entities/{{dashCase name}}';
import { List{{pascalCase name}}sFromDatabaseUsecase } from '@/domain/usecases/{{dashCase name}}';
import { Create{{pascalCase name}}InDatabaseError } from './errors/create-{{dashCase name}}-in-database-error';

type Create{{pascalCase name}}Injectables = {
  save{{pascalCase name}}InDatabaseRepository: Save{{pascalCase name}}InDatabaseRepository;
  list{{pascalCase name}}sFromDatabaseUsecase: List{{pascalCase name}}sFromDatabaseUsecase;
  UUIDGenerator: UUIDGenerator;
};

class Create{{pascalCase name}}InDatabase implements Create{{pascalCase name}}InDatabaseUsecase {
  private readonly save{{pascalCase name}}InDatabaseRepository: Save{{pascalCase name}}InDatabaseRepository;
  private readonly list{{pascalCase name}}sFromDatabaseUsecase: List{{pascalCase name}}sFromDatabaseUsecase;
  private readonly UUIDGenerator: UUIDGenerator;

  constructor({
    save{{pascalCase name}}InDatabaseRepository,
    list{{pascalCase name}}sFromDatabaseUsecase,
    UUIDGenerator,
  }: Create{{pascalCase name}}Injectables) {
    this.save{{pascalCase name}}InDatabaseRepository = save{{pascalCase name}}InDatabaseRepository;
    this.list{{pascalCase name}}sFromDatabaseUsecase = list{{pascalCase name}}sFromDatabaseUsecase;
    this.UUIDGenerator = UUIDGenerator;
  }

  async create(
    {{camelCase name}}Params: Create{{pascalCase name}}InDatabaseUsecase.Params
  ): Promise<Create{{pascalCase name}}InDatabaseUsecase.Result> {
    const { userRequester, name } = {{camelCase name}}Params;

    const { total{{pascalCase name}}s } = await this.list{{pascalCase name}}sFromDatabaseUsecase.list({
      userRequester,
      name,
    });

    if (total{{pascalCase name}}s !== 0) {
      throw new Create{{pascalCase name}}InDatabaseError(
        '{{pascalCase name}} with this name already exists'
      );
    }

    const id = this.UUIDGenerator.generate();

    const new{{pascalCase name}} = new {{pascalCase name}}({ id, name });

    const new{{pascalCase name}}Data = new{{pascalCase name}}.toJSON();

    await this.save{{pascalCase name}}InDatabaseRepository.save(new{{pascalCase name}}Data);

    return new{{pascalCase name}}Data;
  }
}

export { Create{{pascalCase name}}InDatabase };
