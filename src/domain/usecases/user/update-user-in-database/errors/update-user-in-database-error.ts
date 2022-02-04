class UpdateUserInDatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UpdateUserInDatabaseError';
  }
}

export { UpdateUserInDatabaseError };
