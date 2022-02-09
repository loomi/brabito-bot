import { Message } from 'discord.js';

import {
  listAllocatedPrsCommandHandler,
  listAvailablePrsCommandHandler,
  listCommandsCommandHandler,
  pingCommandHandler,
  whoamiCommandHandler,
} from './commands';

import { extractCommand } from './helpers';

export const discordListener = async (
  message: Message<boolean>
): Promise<void> => {
  const shouldContinue = extractCommand(message.content);

  if (shouldContinue !== 'ignore') {
    const { command } = shouldContinue;
    console.log(message);

    if (command === 'ping') await pingCommandHandler(message);
    else if (command === 'whoami') whoamiCommandHandler(message);
    else if (command === 'comandos') listCommandsCommandHandler(message);
    else if (command === 'tem_pr') listAvailablePrsCommandHandler(message);
    else if (command === 'alocados') listAllocatedPrsCommandHandler(message);
  }
};
