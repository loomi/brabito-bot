class LoginInCloudError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LoginCloudError';
  }
}

export { LoginInCloudError };
