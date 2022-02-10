class ListPrsFromDatabaseServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ListPrsFromDatabaseServiceError';
  }
}

export { ListPrsFromDatabaseServiceError };
