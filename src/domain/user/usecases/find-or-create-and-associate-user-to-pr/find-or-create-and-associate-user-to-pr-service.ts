import { FindoOrCreateAndAssociateUserToPrUsecase } from './protocols';
import { UUIDGenerator } from '@/shared/uuid';

import { ListPrsUsecase } from '@/domain/pr/usecases/list-prs-from-database/protocols';
import { UpdatePrUsecase } from '@/domain/pr/usecases/update-pr-in-database/protocols';

import { ListUsersUsecase } from '../list-users-from-database/protocols';
import { CreateUserUsecase } from '../create-user-in-database/protocols';

type FindOrCreateAndAssociateUserToPrServiceInjectables = {
  listPrsService: ListPrsUsecase;
  updatePrService: UpdatePrUsecase;
  listUsersService: ListUsersUsecase;
  createUserService: CreateUserUsecase;
  UUIDGenerator: UUIDGenerator;
};

class FindOrCreateAndAssociateUserToPrService
  implements FindoOrCreateAndAssociateUserToPrUsecase
{
  private readonly listPrsService: ListPrsUsecase;
  private readonly updatePrService: UpdatePrUsecase;
  private readonly listUsersService: ListUsersUsecase;
  private readonly createUserService: CreateUserUsecase;
  private readonly UUIDGenerator: UUIDGenerator;

  constructor({
    listPrsService,
    updatePrService,
    listUsersService,
    createUserService,
    UUIDGenerator,
  }: FindOrCreateAndAssociateUserToPrServiceInjectables) {
    this.listPrsService = listPrsService;
    this.updatePrService = updatePrService;
    this.listUsersService = listUsersService;
    this.createUserService = createUserService;
    this.UUIDGenerator = UUIDGenerator;
  }

  async findOrCreate(
    userParams: FindoOrCreateAndAssociateUserToPrUsecase.Params
  ): Promise<FindoOrCreateAndAssociateUserToPrUsecase.Result> {
    const { prDiscordId, userDiscordId } = userParams;

    const { prs } = await this.listPrsService.list({
      discordId: prDiscordId,
    });

    const [prFounded] = prs;
    if (!prFounded) return 'pr-not-found';

    const { users } = await this.listUsersService.list({
      discordId: userDiscordId,
    });

    const [isUser] = users;
    const userToHandle =
      isUser ||
      (await this.createUserService.create({
        discordId: userDiscordId,
        name: userParams.userName,
      }));

    await this.updatePrService.update({
      id: prFounded.getId(),
      userId: userToHandle.getId(),
      status: 'review-requested',
    });

    return userToHandle;
  }
}

export { FindOrCreateAndAssociateUserToPrService };
