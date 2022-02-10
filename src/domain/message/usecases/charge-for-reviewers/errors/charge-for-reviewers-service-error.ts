class ChargeForReviewersServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ChargeForReviewersServiceError';
  }
}

export { ChargeForReviewersServiceError };
