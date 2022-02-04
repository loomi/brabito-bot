import {
  ListUsersFromDatabaseUsecase,
  ListUsersFromCloudUsecase,
} from '@/domain/usecases/user';
import { ForgotPasswordInCloudError } from './errors';
import { ForgotPasswordInCloudUsecase } from './forgot-password-in-cloud-usecase';
import { ForgotPasswordInCloudProvider } from './protocols';

type ForgotPasswordInCloudInjectables = {
  listUsersFromCloudUsecase: ListUsersFromCloudUsecase;
  listUsersFromDatabaseUsecase: ListUsersFromDatabaseUsecase;
  forgotPasswordInCloudProvider: ForgotPasswordInCloudProvider;
};

class ForgotPasswordInCloud implements ForgotPasswordInCloudUsecase {
  private readonly listUsersFromCloudUsecase: ListUsersFromCloudUsecase;
  private readonly listUsersFromDatabaseUsecase: ListUsersFromDatabaseUsecase;
  private readonly forgotPasswordInCloudProvider: ForgotPasswordInCloudProvider;

  constructor({
    listUsersFromCloudUsecase,
    listUsersFromDatabaseUsecase,
    forgotPasswordInCloudProvider,
  }: ForgotPasswordInCloudInjectables) {
    this.listUsersFromCloudUsecase = listUsersFromCloudUsecase;
    this.listUsersFromDatabaseUsecase = listUsersFromDatabaseUsecase;
    this.forgotPasswordInCloudProvider = forgotPasswordInCloudProvider;
  }

  async forgotPassword(
    forgotParams: ForgotPasswordInCloudUsecase.Params
  ): Promise<ForgotPasswordInCloudUsecase.Result> {
    const { email } = forgotParams;

    const { usersFromCloud } = await this.listUsersFromCloudUsecase.list({
      email,
    });

    const [user] = usersFromCloud;

    if (!user) {
      throw new ForgotPasswordInCloudError('User not found in cloud');
    }

    const { totalUsers } = await this.listUsersFromDatabaseUsecase.list({
      email,
    });

    if (totalUsers === 0) {
      throw new ForgotPasswordInCloudError('User not found in database');
    }

    if (user.status === 'FORCE_CHANGE_PASSWORD') {
      throw new ForgotPasswordInCloudError('User need to make first login');
    }

    await this.forgotPasswordInCloudProvider.forgotPassword({ email });
  }
}

export { ForgotPasswordInCloud };
