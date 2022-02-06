import { MessageData } from '@/domain/message/MessageData';

export interface SendMessageUsecase {
  send(message?: MessageData): Promise<void>;
}
