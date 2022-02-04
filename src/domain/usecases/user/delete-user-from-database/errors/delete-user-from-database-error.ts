class DeleteUserFromDatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DeleteUserFromDatabaseError';
  }
}

export { DeleteUserFromDatabaseError };
