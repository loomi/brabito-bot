import { CreatePrUsecase, CreatePrInDatabaseRepository } from './protocols';
import { UUIDGenerator } from '@/shared/uuid';
import { Pr } from '@/domain/pr';

type CreatePrInDatabaseServiceInjectables = {
  createPrInDatabaseRepository: CreatePrInDatabaseRepository;
  UUIDGenerator: UUIDGenerator;
};

class CreatePrInDatabaseService implements CreatePrUsecase {
  private readonly createPrInDatabaseRepository: CreatePrInDatabaseRepository;
  private readonly UUIDGenerator: UUIDGenerator;

  constructor({
    createPrInDatabaseRepository,
    UUIDGenerator,
  }: CreatePrInDatabaseServiceInjectables) {
    this.createPrInDatabaseRepository = createPrInDatabaseRepository;
    this.UUIDGenerator = UUIDGenerator;
  }

  async create(
    prParams: CreatePrUsecase.Params
  ): Promise<CreatePrUsecase.Result> {
    const id = this.UUIDGenerator.generate();

    const newPr = new Pr({
      createPrParams: {
        ...prParams,
        id,
      },
    });

    return newPr;
  }
}

export { CreatePrInDatabaseService };
