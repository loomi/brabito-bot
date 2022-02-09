import { CreatePrFromWebhookCallUsecase } from './protocols';
import { UUIDGenerator } from '@/shared/uuid';
import { Pr } from '@/domain/pr';

import { CreatePrInDatabaseRepository } from '../create-pr-in-database/protocols';
import { CreatePrFromWebhookCallServiceError } from './errors';

type CreatePrInDatabaseServiceInjectables = {
  createPrInDatabaseRepository: CreatePrInDatabaseRepository;
  UUIDGenerator: UUIDGenerator;
};

class CreatePrFromWebhookCallService implements CreatePrFromWebhookCallUsecase {
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
    prParams: CreatePrFromWebhookCallUsecase.Params
  ): Promise<CreatePrFromWebhookCallUsecase.Result> {
    const status = prParams.action || 'not_defined';
    const githubId = `${prParams.pull_request?.id}` || 'not_defined';
    const title = prParams.pull_request?.title || 'not_defined';

    const isInvalidParams = [status, githubId, title].filter(
      (value: string) => value === 'not_defined'
    );
    if (isInvalidParams.length) {
      throw new CreatePrFromWebhookCallServiceError(
        `Invalid Params: ${isInvalidParams.join(' ')}`
      );
    }

    const isUrgentPr = prParams.pull_request?.labels?.some(
      (label: any) => label.name === 'urgent'
    );
    const userGithubNick =
      prParams.pull_request?.user?.login || "someone_who_i_don't_know";
    const id = this.UUIDGenerator.generate();

    const discordId = `${id.split('-')[2]}-${githubId.slice(
      githubId.length - 4
    )}`;
    const projectName = prParams.repository?.name || 'cant_find :cry:';
    const newPr = new Pr({
      createPrParams: {
        id,
        discordId,
        githubId,
        status,
        title,
        urgenceLevel: isUrgentPr ? 'urgent' : 'important',
        userGithubNick,
        projectName,
        userId: null,
      },
    });

    await this.createPrInDatabaseRepository.createPr(newPr);

    return newPr;
  }
}

export { CreatePrFromWebhookCallService };
