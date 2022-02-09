import { makePinoLoggerLocalAdapter } from '@/main/factories/infra/logs/pino';
import { CreatePrUsecase } from '../create-pr-in-database/protocols';
import { ListPrsFromDatabaseRepository } from '../list-prs-from-database/protocols';
import { UpdatePrFromWebhookCallUsecase } from '../update-pr-from-webhook-call/protocols';
import { PrWebhookHandler } from './protocols';
// import { PrWebhookHandlerServiceError } from './errors';

type CreatePrInDatabaseServiceInjectables = {
  createPrFromWebhookCall: CreatePrUsecase;
  updatePrFromWebhookCall: UpdatePrFromWebhookCallUsecase;
  listPrsFromDatabaseRepository: ListPrsFromDatabaseRepository;
};

class PrsWebhookHandler implements PrWebhookHandler {
  private readonly createPrFromWebhookCall: CreatePrUsecase;
  private readonly updatePrFromWebhookCall: UpdatePrFromWebhookCallUsecase;
  private readonly listPrsFromDatabaseRepository: ListPrsFromDatabaseRepository;

  constructor({
    createPrFromWebhookCall,
    updatePrFromWebhookCall,
    listPrsFromDatabaseRepository,
  }: CreatePrInDatabaseServiceInjectables) {
    this.createPrFromWebhookCall = createPrFromWebhookCall;
    this.listPrsFromDatabaseRepository = listPrsFromDatabaseRepository;
    this.updatePrFromWebhookCall = updatePrFromWebhookCall;
  }

  async createOrUpdatePr(params: PrWebhookHandler.Params): Promise<void> {
    try {
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
