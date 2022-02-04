import { ListUsersFromCloudRepository } from '@/domain/usecases/user/list-users-from-cloud/protocols';
import aws, { CognitoIdentityServiceProvider } from 'aws-sdk';

import cognitoEnvironment from './cognito-environment';

export class CognitoListUsersFromCloudRepository
  implements ListUsersFromCloudRepository
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

  async list(
    userParams: ListUsersFromCloudRepository.Params
  ): Promise<ListUsersFromCloudRepository.Result> {
    const { email } = userParams;

    return new Promise((resolve, reject) => {
      this.cognitoInstance.adminGetUser(
        {
          Username: email,
          UserPoolId: cognitoEnvironment.userPoolId,
        },
        (err, data) => {
          if (err) {
            return reject(err);
          }

          const {
            Username: username,
            Enabled: enabled,
            UserStatus: status,
          }: any = data;

          resolve({ usersFromCloud: [{ username, email, enabled, status }] });
        }
      );
    });
  }
}
