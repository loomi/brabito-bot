import { LoginInCloudError } from './errors';
import { LoginInCloudProvider } from './protocols';
import {
  ListUsersFromDatabaseUsecase,
  ListUsersFromCloudUsecase,
} from '@/domain/usecases/user';
import { LoginInCloudUsecase } from './login-in-cloud-usecase';

type LoginInCloudInjectables = {
  listUsersFromDatabaseUsecase: ListUsersFromDatabaseUsecase;
  listUsersFromCloudUsecase: ListUsersFromCloudUsecase;
  loginInCloudProvider: LoginInCloudProvider;
};

class LoginInCloud implements LoginInCloudUsecase {
  private readonly listUsersFromDatabaseUsecase: ListUsersFromDatabaseUsecase;
  private readonly listUsersFromCloudUsecase: ListUsersFromCloudUsecase;
  private readonly loginInCloudProvider: LoginInCloudProvider;

  constructor({
    listUsersFromDatabaseUsecase,
    listUsersFromCloudUsecase,
    loginInCloudProvider,
  }: LoginInCloudInjectables) {
    this.listUsersFromDatabaseUsecase = listUsersFromDatabaseUsecase;
    this.listUsersFromCloudUsecase = listUsersFromCloudUsecase;
    this.loginInCloudProvider = loginInCloudProvider;
  }

  async login(
    loginParams: LoginInCloudUsecase.Params
  ): Promise<LoginInCloudUsecase.Result> {
    const { email, password } = loginParams;

    const { users, totalUsers } = await this.listUsersFromDatabaseUsecase.list({
      email,
    });

    if (totalUsers === 0) {
      throw new LoginInCloudError(`User with email: ${email}, not found`);
    }

    const { usersFromCloud } = await this.listUsersFromCloudUsecase.list({
      email,
    });

    const [userToLogin] = usersFromCloud;

    const userToLoginStatus = userToLogin.status;

    if (userToLoginStatus === 'FORCE_CHANGE_PASSWORD') {
      throw new LoginInCloudError('User need make first login');
    }

    if (userToLoginStatus === 'NEW_PASSWORD_REQUIRED') {
      throw new LoginInCloudError('User need to set a new password');
    }

    const { accessToken, refreshToken } = await this.loginInCloudProvider.login(
      {
        email,
        password,
      }
    );

    const [user] = users;

    return { accessToken, refreshToken, user };
  }
}

export { LoginInCloud };
