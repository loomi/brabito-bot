import { Message } from 'discord.js';

import { availableCommands } from '../helpers';

export const listCommandsCommandHandler = async (message: Message) => {
  const basicHello = 'Esse são todos os comandos disponíveis:';
  const listOfCommands = Object.entries(availableCommands).reduce(
    (stringAcc, [keyCommand, valueDescription]) => {
      return `${stringAcc}\n**/${keyCommand}** - ${valueDescription}`;
    },
    ``
  );
  await message.reply(
    `${basicHello}\n${listOfCommands}\n\nEspero ter ajudado :face_with_hand_over_mouth:`
  );
};
