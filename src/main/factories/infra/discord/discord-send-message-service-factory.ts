import { SendMessageService } from '@/domain/usecases/protocols/message';
import { DiscordSendMessageService } from '@/infra/discord';

export const makeDiscordSendMessageService = (): SendMessageService => {
  return new DiscordSendMessageService();
};
