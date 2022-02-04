import { ListUsersFromCloudUsecase } from './list-users-from-cloud-usecase';
import { ListUsersFromCloudRepository } from './protocols';

type ListeUsersFromCloudInjectables = {
  listUsersFromCloudRepository: ListUsersFromCloudRepository;
};

class ListUsersFromCloud implements ListUsersFromCloudUsecase {
  private readonly listUsersFromCloudRepository: ListUsersFromCloudRepository;

  constructor({
    listUsersFromCloudRepository,
  }: ListeUsersFromCloudInjectables) {
    this.listUsersFromCloudRepository = listUsersFromCloudRepository;
  }

  async list(
    userFilters: ListUsersFromCloudUsecase.Params
  ): Promise<ListUsersFromCloudUsecase.Result> {
    const { usersFromCloud } = await this.listUsersFromCloudRepository.list(
      userFilters
    );

    return { usersFromCloud };
  }
}

export { ListUsersFromCloud };
