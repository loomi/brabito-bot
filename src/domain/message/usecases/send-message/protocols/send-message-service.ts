import { MessageData } from '@/domain/message/MessageData';

export interface SendMessageService {
  send(message: MessageData): Promise<void>;
}
