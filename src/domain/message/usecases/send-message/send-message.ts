import { MessageData } from '../../MessageData';
import { SendMessageUsecase } from './send-message-usecase';
import { SendMessageService } from './protocols';

export class SendMessage implements SendMessageUsecase {
  private readonly sendMessageService: SendMessageService;

  constructor(sendMessageService: SendMessageService) {
    this.sendMessageService = sendMessageService;
  }

  async send(message: MessageData): Promise<void> {
    this.sendMessageService.send(message);
  }
}
