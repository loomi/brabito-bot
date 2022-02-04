import { FirstLoginInCloudError } from './errors';
import { FirstLoginInCloudProvider } from './protocols';
import {
  FirstLoginInCloudUsecase,
  LoginInCloudUsecase,
} from '@/domain/usecases/auth';
import {
  ListUsersFromDatabaseUsecase,
  ListUsersFromCloudUsecase,
} from '@/domain/usecases/user';

type FirstLoginInCloudInjectables = {
  listUsersFromDatabaseUsecase: ListUsersFromDatabaseUsecase;
  listUsersFromCloudUsecase: ListUsersFromCloudUsecase;
  firstLoginInCloudProvider: FirstLoginInCloudProvider;
  loginInCloudUsecase: LoginInCloudUsecase;
};

class FirstLoginInCloud implements FirstLoginInCloudUsecase {
  private readonly listUsersFromDatabaseUsecase: ListUsersFromDatabaseUsecase;
  private readonly listUsersFromCloudUsecase: ListUsersFromCloudUsecase;
  private readonly firstLoginInCloudProvider: FirstLoginInCloudProvider;
  private readonly loginInCloudUsecase: LoginInCloudUsecase;

  constructor({
    listUsersFromDatabaseUsecase,
    listUsersFromCloudUsecase,
    firstLoginInCloudProvider,
    loginInCloudUsecase,
  }: FirstLoginInCloudInjectables) {
    this.listUsersFromDatabaseUsecase = listUsersFromDatabaseUsecase;
    this.listUsersFromCloudUsecase = listUsersFromCloudUsecase;
    this.firstLoginInCloudProvider = firstLoginInCloudProvider;
    this.loginInCloudUsecase = loginInCloudUsecase;
  }

  async firstLogin(
    loginParams: FirstLoginInCloudUsecase.Params
  ): Promise<FirstLoginInCloudUsecase.Result> {
    const { email, newPassword, temporaryPassword } = loginParams;

    const { totalUsers } = await this.listUsersFromDatabaseUsecase.list({
      email,
    });

    if (totalUsers === 0) {
      throw new FirstLoginInCloudError(`User with email: ${email}, not found`);
    }

    const { usersFromCloud } = await this.listUsersFromCloudUsecase.list({
      email,
    });

    const [user] = usersFromCloud;

    const userInCloudStatus = user.status;

    if (userInCloudStatus !== 'FORCE_CHANGE_PASSWORD') {
      throw new FirstLoginInCloudError('User already make first login');
    }

    await this.firstLoginInCloudProvider.login({
      email,
      newPassword,
      temporaryPassword,
    });

    const { accessToken, refreshToken } = await this.loginInCloudUsecase.login({
      email,
      password: newPassword,
    });

    return { accessToken, refreshToken };
  }
}

export { FirstLoginInCloud };
