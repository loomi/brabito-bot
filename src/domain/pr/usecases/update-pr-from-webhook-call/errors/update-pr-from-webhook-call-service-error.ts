class UpdatePrFromWebhookCallServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UpdatePrFromWebhookCallServiceError';
  }
}

export { UpdatePrFromWebhookCallServiceError };
