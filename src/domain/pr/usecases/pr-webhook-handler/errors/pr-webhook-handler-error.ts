class PrWebhookHandlerServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PrWebhookHandlerServiceError';
  }
}

export { PrWebhookHandlerServiceError };
