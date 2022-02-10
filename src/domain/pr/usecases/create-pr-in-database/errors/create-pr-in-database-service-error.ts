class CreatePrInDatabaseServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CreatePrInDatabaseServiceError';
  }
}

export { CreatePrInDatabaseServiceError };
