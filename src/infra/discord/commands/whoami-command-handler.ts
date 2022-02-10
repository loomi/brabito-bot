import { Message } from 'discord.js';

export const whoamiCommandHandler = async (message: Message) => {
  await message.reply(`<@!${message.author.id}>, are you kidding me!`);
};
