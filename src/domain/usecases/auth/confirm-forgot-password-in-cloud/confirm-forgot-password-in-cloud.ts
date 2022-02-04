import {
  ListUsersFromCloudUsecase,
  ListUsersFromDatabaseUsecase,
} from '@/domain/usecases/user';
import { LoginInCloudUsecase } from '../login-in-cloud';
import { ConfirmForgotPasswordInCloudUsecase } from './confirm-forgot-password-in-cloud-usecase';
import { ConfirmForgotPasswordInCloudError } from './errors';
import { ConfirmForgotPasswordInCloudProvider } from './protocols';

type ConfirmForgotPasswordInCloudInjectables = {
  listUsersFromCloudUsecase: ListUsersFromCloudUsecase;
  listUsersFromDatabaseUsecase: ListUsersFromDatabaseUsecase;
  confirmForgotPasswordInCloudProvider: ConfirmForgotPasswordInCloudProvider;
  loginInCloudUsecase: LoginInCloudUsecase;
};

class ConfirmForgotPasswordInCloud
  implements ConfirmForgotPasswordInCloudUsecase
{
  private readonly listUsersFromCloudUsecase: ListUsersFromCloudUsecase;
  private readonly listUsersFromDatabaseUsecase: ListUsersFromDatabaseUsecase;
  private readonly confirmForgotPasswordInCloudProvider: ConfirmForgotPasswordInCloudProvider;
  private readonly loginInCloudUsecase: LoginInCloudUsecase;

  constructor({
    listUsersFromCloudUsecase,
    listUsersFromDatabaseUsecase,
    confirmForgotPasswordInCloudProvider,
    loginInCloudUsecase,
  }: ConfirmForgotPasswordInCloudInjectables) {
    this.listUsersFromCloudUsecase = listUsersFromCloudUsecase;
    this.listUsersFromDatabaseUsecase = listUsersFromDatabaseUsecase;
    this.confirmForgotPasswordInCloudProvider =
      confirmForgotPasswordInCloudProvider;
    this.loginInCloudUsecase = loginInCloudUsecase;
  }

  async confirmForgotPassword(
    confirmForgotParams: ConfirmForgotPasswordInCloudUsecase.Params
  ): Promise<ConfirmForgotPasswordInCloudUsecase.Result> {
    const { email, verificationCode, newPassword } = confirmForgotParams;

    const { usersFromCloud } = await this.listUsersFromCloudUsecase.list({
      email,
    });

    const [user] = usersFromCloud;

    if (!user) {
      throw new ConfirmForgotPasswordInCloudError('User not found in cloud');
    }

    const { totalUsers } = await this.listUsersFromDatabaseUsecase.list({
      email,
    });

    if (totalUsers === 0) {
      throw new ConfirmForgotPasswordInCloudError('User not found in database');
    }

    if (user.status === 'FORCE_CHANGE_PASSWORD') {
      throw new ConfirmForgotPasswordInCloudError(
        'User need to make first login'
      );
    }

    await this.confirmForgotPasswordInCloudProvider.confirm({
      email,
      verificationCode,
      newPassword,
    });

    const { accessToken, refreshToken } = await this.loginInCloudUsecase.login({
      email,
      password: newPassword,
    });

    return { accessToken, refreshToken };
  }
}

export { ConfirmForgotPasswordInCloud };
