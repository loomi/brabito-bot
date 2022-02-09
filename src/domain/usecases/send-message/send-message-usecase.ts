import { MessageData } from '@/domain/entities/message/MessageData';

export interface SendMessageUsecase {
  send(message?: MessageData): Promise<void>;
}
