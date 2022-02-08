import { availableCommands, AvailableCommands } from '.';

export const extractCommand = (
  messageContent: string
): 'ignore' | { command: AvailableCommands; cmdOptions: Array<string> } => {
  if (!messageContent.startsWith('/')) return 'ignore';

  const [command, ...restOfMessage] = messageContent.split(' ');
  const cmdWithoutSlash = command.slice(1);
  if (!Object.prototype.hasOwnProperty.call(availableCommands, cmdWithoutSlash))
    return 'ignore';

  return {
    command: cmdWithoutSlash as AvailableCommands,
    cmdOptions: restOfMessage,
  };
};
