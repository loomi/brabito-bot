class CreateUserInDatabaseRepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CreateUserInDatabaseRepositoryError';
  }
}

export { CreateUserInDatabaseRepositoryError };
