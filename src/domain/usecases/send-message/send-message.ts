import { MessageData } from '@/domain/entities/message/MessageData';
import { SendMessageService } from '../protocols/message';
import { SendMessageUsecase } from './send-message-usecase';

export class SendMessage implements SendMessageUsecase {
  private readonly sendMessageService: SendMessageService;

  constructor(sendMessageService: SendMessageService) {
    this.sendMessageService = sendMessageService;
  }

  async send(message: MessageData): Promise<void> {
    this.sendMessageService.send(message);
  }
}
