import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import { SaveUserInCloudRepository } from '@/domain/usecases/user/create-user-in-cloud/protocols';

import cognitoEnvironment from './cognito-environment';

export class CognitoSaveUserInCloudRepository
  implements SaveUserInCloudRepository
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

  async save(
    userParams: SaveUserInCloudRepository.Params
  ): Promise<SaveUserInCloudRepository.Result> {
    const { email } = userParams;

    const attributes = [
      {
        Name: 'email',
        Value: email,
      },
      {
        Name: 'email_verified',
        Value: 'True',
      },
    ];

    return new Promise<SaveUserInCloudRepository.Result>((resolve, reject) => {
      this.cognitoInstance.adminCreateUser(
        {
          Username: email,
          UserAttributes: attributes,
          UserPoolId: cognitoEnvironment.userPoolId,
          DesiredDeliveryMediums: ['EMAIL'],
          // MessageAction: 'SUPPRESS',
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
