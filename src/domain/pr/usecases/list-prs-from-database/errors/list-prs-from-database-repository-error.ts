class ListPrsFromDatabaseRepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ListPrsFromDatabaseRepositoryError';
  }
}

export { ListPrsFromDatabaseRepositoryError };
