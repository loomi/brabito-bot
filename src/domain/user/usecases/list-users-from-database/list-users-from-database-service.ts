import { ListUsersUsecase, ListUsersInDatabaseRepository } from './protocols';
import { User } from '@/domain/user';

type ListUsersInDatabaseServiceInjectables = {
  listUsersInDatabaseRepository: ListUsersInDatabaseRepository;
};

class ListUsersInDatabaseService implements ListUsersUsecase {
  private readonly listUsersInDatabaseRepository: ListUsersInDatabaseRepository;

  constructor({
    listUsersInDatabaseRepository,
  }: ListUsersInDatabaseServiceInjectables) {
    this.listUsersInDatabaseRepository = listUsersInDatabaseRepository;
  }

  async list(
    userFilters: ListUsersUsecase.Params
  ): Promise<ListUsersUsecase.Result> {
    const { users, totalUsers } =
      await this.listUsersInDatabaseRepository.listUser(userFilters);

    if (totalUsers === 0) {
      return { users: [], totalUsers: 0 };
    }

    const usersEntities = users.map((userInputs) => new User(userInputs));

    return { users: usersEntities, totalUsers };
  }
}

export { ListUsersInDatabaseService };
