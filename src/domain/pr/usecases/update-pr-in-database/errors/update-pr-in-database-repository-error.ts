class UpdatePrInDatabaseRepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UpdatePrInDatabaseRepositoryError';
  }
}

export { UpdatePrInDatabaseRepositoryError };
