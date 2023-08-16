import { AvailableRoles } from '@/shared/types/roles-available';
import discordEnvironment from '../discord-environment';

export type MessageOrigin = {
  roleToMention: string;
  channel: AvailableRoles;
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
  } else if (channelId === discordEnvironment.channels.flutterChannel) {
    return {
      roleToMention: discordEnvironment.channels.flutterRole,
      channel: 'flutter',
    };
  } else return 'not_allowed';
};
