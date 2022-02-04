class LoadUserByTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LoadUserByTokenError';
  }
}

export { LoadUserByTokenError };
