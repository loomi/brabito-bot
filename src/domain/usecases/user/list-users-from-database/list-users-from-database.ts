import { ListUsersFromDatabaseUsecase } from './list-users-from-database-usecase';
import { ListUsersFromDatabaseRepository } from './protocols';

type ListeUserInjectables = {
  listUsersFromDatabaseRepository: ListUsersFromDatabaseRepository;
};

class ListUsersFromDatabase implements ListUsersFromDatabaseUsecase {
  private readonly listUsersFromDatabaseRepository: ListUsersFromDatabaseRepository;

  constructor({ listUsersFromDatabaseRepository }: ListeUserInjectables) {
    this.listUsersFromDatabaseRepository = listUsersFromDatabaseRepository;
  }

  async list(
    userFilters: ListUsersFromDatabaseUsecase.Params
  ): Promise<ListUsersFromDatabaseUsecase.Result> {
    const { userRequester, ...restUserFilters } = userFilters;

    const { users, totalUsers } =
      await this.listUsersFromDatabaseRepository.list(restUserFilters);

    return { users, totalUsers };
  }
}

export { ListUsersFromDatabase };
