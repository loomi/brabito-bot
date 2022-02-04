class LoadUserByTokenInCloudError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LoadUserByTokenInCloudError';
  }
}

export { LoadUserByTokenInCloudError };
