class PrError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PrError';
  }
}

export { PrError };
