import { GetRefreshTokenInCloudProvider } from './protocols';
import { RefreshTokenInCloudUsecase } from './refresh-token-in-cloud-usecase';

type RefreshTokenInCloudInjectables = {
  getRefreshTokenInCloudProvider: GetRefreshTokenInCloudProvider;
};

class RefreshTokenInCloud implements RefreshTokenInCloudUsecase {
  private readonly getRefreshTokenInCloudProvider: GetRefreshTokenInCloudProvider;

  constructor({
    getRefreshTokenInCloudProvider,
  }: RefreshTokenInCloudInjectables) {
    this.getRefreshTokenInCloudProvider = getRefreshTokenInCloudProvider;
  }

  async refresh(
    refreshTokenParams: RefreshTokenInCloudUsecase.Params
  ): Promise<RefreshTokenInCloudUsecase.Result> {
    const { refreshToken } = refreshTokenParams;

    const { accessToken, refreshToken: newRefreshToken } =
      await this.getRefreshTokenInCloudProvider.get({ refreshToken });

    return { accessToken, refreshToken: newRefreshToken };
  }
}

export { RefreshTokenInCloud };
