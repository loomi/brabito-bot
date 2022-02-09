import { availableCommands, AvailableCommands } from '.';

export const extractCommand = (
  messageContent: string
): 'ignore' | { command: AvailableCommands } => {
  if (!messageContent.startsWith('/')) return 'ignore';

  const [command] = messageContent.split(' ');
  const cmdWithoutSlash = command.slice(1);
  if (!Object.prototype.hasOwnProperty.call(availableCommands, cmdWithoutSlash))
    return 'ignore';

  return { command: cmdWithoutSlash as AvailableCommands };
};

export const getCmdOptions = (
  messageContent: string
): { cmdOptions: Array<string> } => {
  // eslint-disable-next-line no-unused-vars
  const [command, ...restOfMessage] = messageContent.split(' ');

  return { cmdOptions: restOfMessage };
};
