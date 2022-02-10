import { Pr } from '@/domain/pr';
import { ListPrsUsecase, ListPrsFromDatabaseRepository } from './protocols';

type ListPrsInDatabaseServiceInjectables = {
  listPrsInDatabaseRepository: ListPrsFromDatabaseRepository;
};

class ListPrsInDatabaseService implements ListPrsUsecase {
  private readonly listPrsInDatabaseRepository: ListPrsFromDatabaseRepository;

  constructor({
    listPrsInDatabaseRepository,
  }: ListPrsInDatabaseServiceInjectables) {
    this.listPrsInDatabaseRepository = listPrsInDatabaseRepository;
  }

  async list(prFilters: ListPrsUsecase.Params): Promise<ListPrsUsecase.Result> {
    const { prs, totalPrs } = await this.listPrsInDatabaseRepository.listPrs(
      prFilters
    );

    if (totalPrs === 0) {
      return { prs: [], totalPrs: 0 };
    }

    const prsEntities = prs.map(
      (prInputs) => new Pr({ createPrFromParams: prInputs })
    );

    return { prs: prsEntities, totalPrs };
  }
}

export { ListPrsInDatabaseService };
