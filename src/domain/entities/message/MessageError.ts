class SendMessageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MessageError';
  }
}

export { SendMessageError };
