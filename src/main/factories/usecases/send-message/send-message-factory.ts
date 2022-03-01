import { SendMessageUsecase } from '@/domain/message/usecases/send-message/protocols';
import { SendMessage } from '@/domain/message/usecases/send-message';
import { makeDiscordSendMessageService } from '../../infra/discord/discord-send-message-service-factory';

export const makeSendMessage = (): SendMessageUsecase => {
  const sendMessageService = makeDiscordSendMessageService();

  return new SendMessage(sendMessageService);
};
