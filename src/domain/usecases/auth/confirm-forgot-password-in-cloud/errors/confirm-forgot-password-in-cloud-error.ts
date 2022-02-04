class ConfirmForgotPasswordInCloudError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfirmForgotPasswordInCloudError';
  }
}

export { ConfirmForgotPasswordInCloudError };
