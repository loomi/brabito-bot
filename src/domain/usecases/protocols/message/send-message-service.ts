import { MessageData } from '@/domain/entities/message/MessageData';

export interface SendMessageService {
  send(message: MessageData): Promise<void>;
}
