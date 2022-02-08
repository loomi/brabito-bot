import { Message } from 'discord.js';

export const pingCommandHandler = async (message: Message) => {
  await message.reply('pong!');
};
