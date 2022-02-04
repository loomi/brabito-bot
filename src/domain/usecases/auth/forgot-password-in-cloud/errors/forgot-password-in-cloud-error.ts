class ForgotPasswordInCloudError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ForgotPasswordInCloudError';
  }
}

export { ForgotPasswordInCloudError };
