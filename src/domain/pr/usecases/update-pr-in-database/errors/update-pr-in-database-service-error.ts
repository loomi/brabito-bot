class UpdatePrInDatabaseServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UpdatePrInDatabaseServiceError';
  }
}

export { UpdatePrInDatabaseServiceError };
