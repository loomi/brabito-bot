import { SendMessageUsecase } from '@/domain/message/usecases/send-message/protocols';
import { env } from '@/main/config';
import { makePinoLoggerLocalAdapter } from '@/main/factories/infra/logs/pino';
import { CreatePrUsecase } from '../create-pr-in-database/protocols';
import { ListPrsFromDatabaseRepository } from '../list-prs-from-database/protocols';
import { UpdatePrFromWebhookCallUsecase } from '../update-pr-from-webhook-call/protocols';
import { PrWebhookHandlerServiceError } from './errors';
import { PrWebhookHandler } from './protocols';
// import { PrWebhookHandlerServiceError } from './errors';

type CreatePrInDatabaseServiceInjectables = {
  sendMessageUsecase: SendMessageUsecase;
  createPrFromWebhookCall: CreatePrUsecase;
  updatePrFromWebhookCall: UpdatePrFromWebhookCallUsecase;
  listPrsFromDatabaseRepository: ListPrsFromDatabaseRepository;
};

class PrsWebhookHandler implements PrWebhookHandler {
  private readonly sendMessageUsecase: SendMessageUsecase;
  private readonly createPrFromWebhookCall: CreatePrUsecase;
  private readonly updatePrFromWebhookCall: UpdatePrFromWebhookCallUsecase;
  private readonly listPrsFromDatabaseRepository: ListPrsFromDatabaseRepository;

  constructor({
    sendMessageUsecase,
    createPrFromWebhookCall,
    updatePrFromWebhookCall,
    listPrsFromDatabaseRepository,
  }: CreatePrInDatabaseServiceInjectables) {
    this.sendMessageUsecase = sendMessageUsecase;
    this.createPrFromWebhookCall = createPrFromWebhookCall;
    this.listPrsFromDatabaseRepository = listPrsFromDatabaseRepository;
    this.updatePrFromWebhookCall = updatePrFromWebhookCall;
  }

  async createOrUpdatePr(params: PrWebhookHandler.Params): Promise<void> {
    try {
      const { origin } = params;

      console.log('HTTP REQUEST');
      console.log(params);

      if (origin !== 'back' && origin !== 'front' && origin !== undefined) {
        this.sendMessageUsecase.send({
          message: {
            content: `Ohhh <@&${env.bot.channels.backRole}>, algum engraçadinhe configurou errado o PAYLOAD do projeto **${params?.repository.name}**. Assim não dá pra fazer a mágica né... Alguém corrige lá, por favor :rolling_eyes:\nOlha o link: https://github.com/${params?.repository.full_name}/settings/hooks`,
          },
          recipient: 'back',
        });
        this.sendMessageUsecase.send({
          message: {
            content: `Ohhh <@&${env.bot.channels.frontRole}>, algum engraçadinhe configurou errado o PAYLOAD do projeto **${params?.repository.name}**. Assim não dá pra fazer a mágica né... Alguém corrige lá, por favor :rolling_eyes:\nOlha o link: https://github.com/${params?.repository.full_name}/settings/hooks`,
          },
          recipient: 'front',
        });

        throw new PrWebhookHandlerServiceError(
          `Wrong webhook payload from ${params?.repository?.name}`
        );
      }

      const userGithubNick = params.pull_request?.user?.login;

      if (userGithubNick === 'dependabot[bot]') return;

      const githubId = `${params.pull_request?.id}`;

      const { prs } = await this.listPrsFromDatabaseRepository.listPrs({
        githubId,
      });

      const [isPr] = prs;

      if (isPr) {
        await this.updatePrFromWebhookCall.updatePr(params);
      } else {
        await this.createPrFromWebhookCall.create(params);
      }
    } catch (error) {
      const loggerLocal = makePinoLoggerLocalAdapter();
      loggerLocal.logError(error as Error);
      throw error;
    }
  }
}

export { PrsWebhookHandler };
