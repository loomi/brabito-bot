import { SendMessageUsecase } from './protocols';

export class SendMessage implements SendMessageUsecase {
  private readonly sendMessageService: SendMessageUsecase;

  constructor(sendMessageService: SendMessageUsecase) {
    this.sendMessageService = sendMessageService;
  }

  async send(
    params: SendMessageUsecase.Params
  ): Promise<SendMessageUsecase.Result> {
    const { message, recipient } = params;
    await this.sendMessageService.send({ message, recipient });
  }
}
