class CreateUserInDatabaseServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CreateUserInDatabaseServiceError';
  }
}

export { CreateUserInDatabaseServiceError };
