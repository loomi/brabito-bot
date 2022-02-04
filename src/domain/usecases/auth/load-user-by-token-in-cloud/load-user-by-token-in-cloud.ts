import { LoadUserByTokenInCloudError } from './errors';
import { LoadUserByTokenInCloudProvider } from './protocols';
import { LoadUserByTokenInCloudUsecase } from './load-user-by-token-in-cloud-usecase';

type LoadUserByTokenInCloudInjectables = {
  loadUserByTokenInCloudProvider: LoadUserByTokenInCloudProvider;
};

class LoadUserByTokenInCloud implements LoadUserByTokenInCloudUsecase {
  private readonly loadUserByTokenInCloudProvider: LoadUserByTokenInCloudProvider;

  constructor({
    loadUserByTokenInCloudProvider,
  }: LoadUserByTokenInCloudInjectables) {
    this.loadUserByTokenInCloudProvider = loadUserByTokenInCloudProvider;
  }

  async loadUser(
    loadUserParams: LoadUserByTokenInCloudUsecase.Params
  ): Promise<LoadUserByTokenInCloudUsecase.Result> {
    const { token } = loadUserParams;

    const userInCloud = await this.loadUserByTokenInCloudProvider.loadUser({
      token,
    });

    if (!userInCloud) {
      throw new LoadUserByTokenInCloudError('User not found');
    }

    return userInCloud;
  }
}

export { LoadUserByTokenInCloud };
