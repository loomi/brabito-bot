class CreatePrInDatabaseRepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CreatePrInDatabaseRepositoryError';
  }
}

export { CreatePrInDatabaseRepositoryError };
