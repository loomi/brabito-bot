class CreateUserInDatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CreateUserInDatabaseError';
  }
}

export { CreateUserInDatabaseError };
