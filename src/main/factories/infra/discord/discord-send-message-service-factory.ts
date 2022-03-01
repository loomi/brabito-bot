import { SendMessageUsecase } from '@/domain/message/usecases/send-message/protocols';
import { DiscordSendMessageService } from '@/infra/discord';

export const makeDiscordSendMessageService = (): SendMessageUsecase => {
  return new DiscordSendMessageService();
};
