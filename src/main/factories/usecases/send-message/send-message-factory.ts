import { SendMessageService } from '@/domain/usecases/protocols/message';
import { SendMessage } from '@/domain/usecases/send-message/send-message';
import { makeDiscordSendMessageService } from '../../infra/discord/discord-send-message-service-factory';

export const makeSendMessage = (): SendMessageService => {
  const sendMessageService = makeDiscordSendMessageService();

  return new SendMessage(sendMessageService);
};
