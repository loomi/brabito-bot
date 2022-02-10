import { Message } from 'discord.js';

import {
  alloocateUserToPrCommandHandler,
  listAllocatedPrsCommandHandler,
  listAllPrsCommandHandler,
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
  if (shouldContinue === 'ignore') {
    // do nothing
  } else if (shouldContinue === 'not_a_command') {
    message.reply(
      `<@!${message.author.id}>, meus chakras me dizem que vc tenta estabelecer conexçao comigo :genie:, mas acho que não estamos em sintonia ou o Wi-Fi deve ter caido... :confused:\n\t\t *~ dica: roda \`/help\` pra ficarmos na mesma página :wink:*`
    );
  } else {
    const { command } = shouldContinue;

    if (command === 'ping') await pingCommandHandler(message);
    else if (command === 'whoami') whoamiCommandHandler(message);
    else if (command === 'comandos') listCommandsCommandHandler(message);
    else if (command === 'help') listCommandsCommandHandler(message);
    else if (command === 'tem_pr') listAvailablePrsCommandHandler(message);
    else if (command === 'alocados') listAllocatedPrsCommandHandler(message);
    else if (command === 'me_aloca_aqui')
      alloocateUserToPrCommandHandler(message);
    else if (command === 'prs') listAllPrsCommandHandler(message);
  }
};
