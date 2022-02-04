import { ForgotPasswordInCloudProvider } from '@/domain/usecases/auth/forgot-password-in-cloud/protocols';
import { CognitoForgotPasswordInCloudProvider } from '@/infra/cloud/cognito';

export const makeCognitoForgotPasswordInCloudProvider =
  (): ForgotPasswordInCloudProvider => {
    return new CognitoForgotPasswordInCloudProvider();
  };
