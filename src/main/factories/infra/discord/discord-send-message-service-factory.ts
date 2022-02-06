import { SendMessageService } from '@/domain/message/usecases/send-message/protocols';
import { DiscordSendMessageService } from '@/infra/discord';

export const makeDiscordSendMessageService = (): SendMessageService => {
  return new DiscordSendMessageService();
};
