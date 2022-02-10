import { Client, Intents } from 'discord.js';

import discordEnvironment from './discord-environment';
import { discordListener } from './discord-listener';

export class DiscordBot {
  private discordClient: Client | null = null;

  async start(): Promise<Client> {
    this.discordClient = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });

    await this.discordClient.login(discordEnvironment.discordToken);

    this.discordClient.on('messageCreate', (message) =>
      discordListener(message)
    );

    return Promise.resolve(this.discordClient);
  }

  getClient() {
    return this.discordClient;
  }

  close() {
    this.discordClient?.removeAllListeners();
    this.discordClient?.destroy();
  }
}

const discordBot = new DiscordBot();

export { discordBot };
