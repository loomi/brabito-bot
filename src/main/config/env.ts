import 'dotenv/config';

export const env = {
  application: {
    mode: process.env.NODE_ENV as string,
  },
  cors: {
    production: {
      url: process.env.PRODUCTION_DEPLOY_URL as string,
      frontUrl: process.env.PRODUCTION_FRONT_DEPLOY_URL as string,
    },
    stage: {
      url: process.env.STAGE_DEPLOY_URL as string,
      frontUrl: process.env.STAGE_FRONT_DEPLOY_URL as string,
    },
  },
  httpServer: {
    port: parseInt(process.env.API_PORT as string, 10) || (3001 as number),
  },
  logs: {
    sentry: {
      url: process.env.SENTRY_URL as string,
    },
  },
  bot: {
    discordToken: process.env.DISCORD_TOKEN as string,
    channels: {
      general: process.env.GENERAL_CHANNEL_ID as string,
    },
  },
};
