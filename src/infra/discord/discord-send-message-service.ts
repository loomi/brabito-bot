import { SendMessageUsecase } from '@/domain/message/usecases/send-message/protocols';
import { discordBot } from './discord-bot';
import discordEnvironment from './discord-environment';

class DiscordSendMessageService implements SendMessageUsecase {
  async send(params: SendMessageUsecase.Params): Promise<void> {
    const { message, recipient } = params;

    const getChannelId = {
      back: discordEnvironment.channels.backChannel,
      front: discordEnvironment.channels.frontChannel,
    };

    const generalChannelId = getChannelId[recipient];

    const channel = await discordBot
      ?.getClient()
      ?.channels.fetch(generalChannelId);

    // @ts-ignore
    channel.send(message);
  }
}

export { DiscordSendMessageService };
