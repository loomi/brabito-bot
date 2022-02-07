class ListUsersFromDatabaseRepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ListUsersFromDatabaseRepositoryError';
  }
}

export { ListUsersFromDatabaseRepositoryError };
