import { Client, Intents } from 'discord.js';

import discordEnvironment from './discord-environment';

export class DiscordBot {
  private discordClient: Client | null = null;

  async start(): Promise<Client> {
    this.discordClient = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });

    await this.discordClient.login(discordEnvironment.discordToken);

    return Promise.resolve(this.discordClient);
  }

  getClient() {
    return this.discordClient;
  }
}

const discordBot = new DiscordBot();

export { discordBot };
