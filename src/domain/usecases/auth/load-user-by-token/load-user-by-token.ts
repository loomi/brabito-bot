import { LoadUserByTokenError } from './errors';
import { LoadUserByTokenUsecase } from './load-user-by-token-usecase';
import { ListUsersFromDatabaseUsecase } from '@/domain/usecases/user';
import { LoadUserByTokenInCloudUsecase } from '@/domain/usecases/auth';

type LoadUserByTokenInjectables = {
  loadUserByTokenInCloudUsecase: LoadUserByTokenInCloudUsecase;
  listUsersFromDatabaseUsecase: ListUsersFromDatabaseUsecase;
};

class LoadUserByToken implements LoadUserByTokenUsecase {
  private readonly loadUserByTokenInCloudUsecase: LoadUserByTokenInCloudUsecase;
  private readonly listUsersFromDatabaseUsecase: ListUsersFromDatabaseUsecase;

  constructor({
    loadUserByTokenInCloudUsecase,
    listUsersFromDatabaseUsecase,
  }: LoadUserByTokenInjectables) {
    this.loadUserByTokenInCloudUsecase = loadUserByTokenInCloudUsecase;
    this.listUsersFromDatabaseUsecase = listUsersFromDatabaseUsecase;
  }

  async loadUser(
    loadUserParams: LoadUserByTokenUsecase.Params
  ): Promise<LoadUserByTokenUsecase.Result> {
    const { token } = loadUserParams;

    const userInCloud = await this.loadUserByTokenInCloudUsecase.loadUser({
      token,
    });

    if (!userInCloud) {
      throw new LoadUserByTokenError('User not found in cloud');
    }

    const { email } = userInCloud;

    const { users, totalUsers } = await this.listUsersFromDatabaseUsecase.list({
      email,
    });

    if (totalUsers === 0) {
      throw new LoadUserByTokenError('User not found in database');
    }

    const [user] = users;

    return user;
  }
}

export { LoadUserByToken };
