import { ListPrsUsecase } from '@/domain/pr/usecases/list-prs-from-database/protocols';
import { UpdatePrUsecase, UpdatePrInDatabaseRepository } from './protocols';
import { UpdatePrInDatabaseServiceError } from './errors';

type UpdatePrInDatabaseServiceInjectables = {
  listPrsUsecase: ListPrsUsecase;
  updatePrInDatabaseRepository: UpdatePrInDatabaseRepository;
};

class UpdatePrInDatabaseService implements UpdatePrUsecase {
  private readonly listPrsUsecase: ListPrsUsecase;
  private readonly updatePrInDatabaseRepository: UpdatePrInDatabaseRepository;

  constructor({
    listPrsUsecase,
    updatePrInDatabaseRepository,
  }: UpdatePrInDatabaseServiceInjectables) {
    this.updatePrInDatabaseRepository = updatePrInDatabaseRepository;
    this.listPrsUsecase = listPrsUsecase;
  }

  async update(
    prParams: UpdatePrUsecase.Params
  ): Promise<UpdatePrUsecase.Result> {
    const { id, ...paramsToUpdatePr } = prParams;

    const { prs, totalPrs } = await this.listPrsUsecase.list({ id });

    if (totalPrs === 0) {
      throw new UpdatePrInDatabaseServiceError('Pr not found');
    }

    const [pr] = prs;

    const prUpdated = pr.updateParams(paramsToUpdatePr);

    await this.updatePrInDatabaseRepository.updatePr(prUpdated);

    return prUpdated;
  }
}

export { UpdatePrInDatabaseService };
