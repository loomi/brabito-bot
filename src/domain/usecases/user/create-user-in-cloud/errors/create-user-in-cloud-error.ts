class CreateUserInCloudError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CreateUserInCloudError';
  }
}

export { CreateUserInCloudError };
