import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import { GetRefreshTokenInCloudProvider } from '@/domain/usecases/auth/refresh-token-in-cloud/protocols';

import cognitoEnvironment from './cognito-environment';
export class CognitoRefreshTokenInCloudProvider
  implements GetRefreshTokenInCloudProvider
{
  private readonly cognitoInstance: CognitoIdentityServiceProvider;

  constructor() {
    this.cognitoInstance = new aws.CognitoIdentityServiceProvider({
      apiVersion: cognitoEnvironment.apiVersion,
      region: cognitoEnvironment.region,
      credentials: new aws.Credentials({
        accessKeyId: cognitoEnvironment.accessKeyId,
        secretAccessKey: cognitoEnvironment.secretAccessKey,
      }),
    });
  }

  async get(
    refreshParams: GetRefreshTokenInCloudProvider.Params
  ): Promise<GetRefreshTokenInCloudProvider.Result> {
    const { refreshToken } = refreshParams;

    return new Promise<GetRefreshTokenInCloudProvider.Result>(
      (resolve, reject) => {
        this.cognitoInstance.initiateAuth(
          {
            AuthFlow: 'REFRESH_TOKEN',
            ClientId: cognitoEnvironment.clientId,
            AuthParameters: {
              REFRESH_TOKEN: refreshToken,
            },
          },
          (err, data) => {
            if (err) {
              return reject(err);
            }

            if (!data.AuthenticationResult) {
              return reject(new Error('Error with Refresh'));
            }

            const {
              AccessToken: accessToken,
              RefreshToken: refreshToken,
            }: any = data.AuthenticationResult;

            resolve({ accessToken, refreshToken });
          }
        );
      }
    );
  }
}
