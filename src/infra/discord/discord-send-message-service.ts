import { MessageData } from '@/domain/entities/message/MessageData';
import { SendMessageService } from '@/domain/usecases/protocols/message';
import { discordBot } from './discord-bot';
import discordEnvironment from './discord-environment';

class DiscordSendMessageService implements SendMessageService {
  async send(message: MessageData): Promise<void> {
    const generalChannelId = discordEnvironment.channels.general;
    const channel = await discordBot
      ?.getClient()
      ?.channels.fetch(generalChannelId);

    // @ts-ignore
    channel.send(message);
  }
}

export { DiscordSendMessageService };
