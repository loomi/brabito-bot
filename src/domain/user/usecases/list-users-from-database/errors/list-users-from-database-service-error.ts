class ListUsersFromDatabaseServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ListUsersFromDatabaseServiceError';
  }
}

export { ListUsersFromDatabaseServiceError };
