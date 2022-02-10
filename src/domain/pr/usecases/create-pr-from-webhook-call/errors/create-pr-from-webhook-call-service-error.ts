class CreatePrFromWebhookCallServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CreatePrFromWebhookCallServiceError';
  }
}

export { CreatePrFromWebhookCallServiceError };
