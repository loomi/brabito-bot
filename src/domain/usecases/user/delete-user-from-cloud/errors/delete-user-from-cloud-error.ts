class DeleteUserFromCloudError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DeleteUserFromCloudError';
  }
}

export { DeleteUserFromCloudError };
