class FindoOrCreateAndAssociateUserToPrServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FindoOrCreateAndAssociateUserToPrServiceError';
  }
}

export { FindoOrCreateAndAssociateUserToPrServiceError };
