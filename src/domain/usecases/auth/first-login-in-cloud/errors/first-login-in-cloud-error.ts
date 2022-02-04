class FirstLoginInCloudError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FirstLoginInCloudError';
  }
}

export { FirstLoginInCloudError };
