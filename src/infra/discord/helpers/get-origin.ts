import discordEnvironment from '../discord-environment';

export type MessageOrigin = {
  roleToMention: string;
  channel: 'back' | 'front';
};

export const getOrigin = (channelId: string): 'not_allowed' | MessageOrigin => {
  if (channelId === discordEnvironment.channels.backChannel) {
    return {
      roleToMention: discordEnvironment.channels.backRole,
      channel: 'back',
    };
  } else if (channelId === discordEnvironment.channels.frontChannel) {
    return {
      roleToMention: discordEnvironment.channels.frontRole,
      channel: 'front',
    };
  } else return 'not_allowed';
};
