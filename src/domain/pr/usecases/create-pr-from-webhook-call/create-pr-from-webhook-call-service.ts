import { CreatePrFromWebhookCallUsecase } from './protocols';
import { UUIDGenerator } from '@/shared/uuid';
import { Pr } from '@/domain/pr';

import { CreatePrInDatabaseRepository } from '../create-pr-in-database/protocols';
import { CreatePrFromWebhookCallServiceError } from './errors';
import { SendMessageUsecase } from '@/domain/message/usecases/send-message';

type CreatePrInDatabaseServiceInjectables = {
  createPrInDatabaseRepository: CreatePrInDatabaseRepository;
  UUIDGenerator: UUIDGenerator;
  sendMessageService: SendMessageUsecase;
};

class CreatePrFromWebhookCallService implements CreatePrFromWebhookCallUsecase {
  private readonly createPrInDatabaseRepository: CreatePrInDatabaseRepository;
  private readonly UUIDGenerator: UUIDGenerator;
  private readonly sendMessageService: SendMessageUsecase;

  constructor({
    createPrInDatabaseRepository,
    UUIDGenerator,
    sendMessageService,
  }: CreatePrInDatabaseServiceInjectables) {
    this.createPrInDatabaseRepository = createPrInDatabaseRepository;
    this.UUIDGenerator = UUIDGenerator;
    this.sendMessageService = sendMessageService;
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

    const prData = newPr.toJSON();
    await this.sendMessageService.send({
      content: `@Back, **${prData.userGithubNick}** acabou de abrir um PR em **${prData.projectName}**!\nO ID dele é **${prData.discordId}** e, como sou um amor de pessoa (ops, bot...), vou até facilitar pra vcs :relieved:\nSó preciso que alguém rode **/me_aloca_aqui ${prData.discordId}**\n||agora não rodem não pra ver como faço da vida de vcs um inferno :imp:||`,
    });

    return newPr;
  }
}

export { CreatePrFromWebhookCallService };
