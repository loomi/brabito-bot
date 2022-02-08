export const availableCommands = {
  ping: 'this is a ping description...',
  whoami: 'command will mention you as reply',
  commands: 'will list all commands and their description',
};

export type AvailableCommands = keyof typeof availableCommands;
