import { ForgotPasswordInCloudProvider } from '@/domain/usecases/auth/forgot-password-in-cloud/protocols';
import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import cognitoEnvironment from './cognito-environment';

export class CognitoForgotPasswordInCloudProvider
  implements ForgotPasswordInCloudProvider
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

  async forgotPassword(
    forgotParams: ForgotPasswordInCloudProvider.Params
  ): Promise<ForgotPasswordInCloudProvider.Result> {
    const { email } = forgotParams;

    return new Promise((resolve, reject) => {
      this.cognitoInstance.forgotPassword(
        {
          ClientId: cognitoEnvironment.clientId,
          Username: email,
        },
        (err, data) => {
          if (err) {
            return reject(err);
          }

          resolve();
        }
      );
    });
  }
}
