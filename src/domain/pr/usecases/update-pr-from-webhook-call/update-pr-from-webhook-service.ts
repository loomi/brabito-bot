import { UpdatePrFromWebhookCallUsecase } from './protocols';
import { UpdatePrFromWebhookCallServiceError } from './errors';
import { UpdatePrInDatabaseRepository } from '../update-pr-in-database/protocols';
import { ListPrsUsecase } from '../list-prs-from-database/protocols/list-prs-from-database-usecase';

type UpdatePrFromWebhookCallServiceInjectables = {
  listPrsUsecase: ListPrsUsecase;
  updatePrInDatabaseRepository: UpdatePrInDatabaseRepository;
};

class UpdatePrFromWebhookCallService implements UpdatePrFromWebhookCallUsecase {
  private readonly listPrsUsecase: ListPrsUsecase;
  private readonly updatePrInDatabaseRepository: UpdatePrInDatabaseRepository;

  constructor({
    listPrsUsecase,
    updatePrInDatabaseRepository,
  }: UpdatePrFromWebhookCallServiceInjectables) {
    this.listPrsUsecase = listPrsUsecase;
    this.updatePrInDatabaseRepository = updatePrInDatabaseRepository;
  }

  async updatePr(
    prParams: UpdatePrFromWebhookCallUsecase.Params
  ): Promise<UpdatePrFromWebhookCallUsecase.Result> {
    const githubId = `${prParams.pull_request?.id}` || 'not_defined';

    if (githubId === 'not_defined') {
      throw new UpdatePrFromWebhookCallServiceError('Cannot found PR!');
    }

    const { prs } = await this.listPrsUsecase.list({ githubId });
    const [prFounded] = prs;

    if (!prFounded) {
      throw new UpdatePrFromWebhookCallServiceError('PR not found!');
    }

    const status = prParams.action || 'not_defined';
    const title = prParams.pull_request?.title || 'not_defined';

    const isInvalidParams = [status, title].filter(
      (value: string) => value === 'not_defined'
    );
    if (isInvalidParams.length) {
      throw new UpdatePrFromWebhookCallServiceError(
        `Invalid Params: ${isInvalidParams.join(' ')}`
      );
    }

    const isUrgentPr = prParams.pull_request?.labels?.some(
      (label: any) => label.name === 'urgent'
    );

    const prUpdated = prFounded.updateParams({
      status,
      urgenceLevel: isUrgentPr ? 'urgent' : 'important',
      title,
      userId: prFounded.toJSON().userId,
    });

    await this.updatePrInDatabaseRepository.updatePr(prUpdated);
  }
}

export { UpdatePrFromWebhookCallService };
