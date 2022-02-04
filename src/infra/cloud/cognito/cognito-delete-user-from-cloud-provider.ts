import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import { DeleteUserFromCloudRepository } from '@/domain/usecases/user/delete-user-from-cloud/protocols';

import cognitoEnvironment from './cognito-environment';

export class CognitoDeleteUserFromCloudRepository
  implements DeleteUserFromCloudRepository
{
  private readonly cognitoFromstance: CognitoIdentityServiceProvider;

  constructor() {
    this.cognitoFromstance = new aws.CognitoIdentityServiceProvider({
      apiVersion: cognitoEnvironment.apiVersion,
      region: cognitoEnvironment.region,
      credentials: new aws.Credentials({
        accessKeyId: cognitoEnvironment.accessKeyId,
        secretAccessKey: cognitoEnvironment.secretAccessKey,
      }),
    });
  }

  async delete(
    userParams: DeleteUserFromCloudRepository.Params
  ): Promise<DeleteUserFromCloudRepository.Result> {
    const { email } = userParams;

    return new Promise<DeleteUserFromCloudRepository.Result>(
      (resolve, reject) => {
        this.cognitoFromstance.adminDeleteUser(
          {
            UserPoolId: cognitoEnvironment.userPoolId,
            Username: email,
          },
          (err, data) => {
            if (err) {
              return reject(err);
            }

            resolve();
          }
        );
      }
    );
  }
}
