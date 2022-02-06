import { SendMessageService } from '@/domain/message/usecases/send-message/protocols';
import { SendMessage } from '@/domain/message/usecases/send-message';
import { makeDiscordSendMessageService } from '../../infra/discord/discord-send-message-service-factory';

export const makeSendMessage = (): SendMessageService => {
  const sendMessageService = makeDiscordSendMessageService();

  return new SendMessage(sendMessageService);
};
