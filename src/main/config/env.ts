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
      backChannel: process.env.DISCORD_BACK_CHANNEL_ID as string,
      frontChannel: process.env.DISCORD_FRONT_CHANNEL_ID as string,
      backRole: process.env.DISCORD_BACK_ROLE_ID as string,
      frontRole: process.env.DISCORD_FRONT_ROLE_ID as string,
    },
  },
  databases: {
    mongo: {
      uri: process.env.MONGO_URI as string,
      username: process.env.MONGO_USERNAME as string,
      password: process.env.MONGO_PASSWORD as string,
      dbPort: process.env.MONGO_DATABASE as string,
      dbName: process.env.MONGO_DB_PORT as string,
      host: process.env.MONGO_DB_HOST as string,
    },
    prisma: {
      databaseUrl: process.env.PRISMA_URL as string,
    },
  },
  scheduler: {
    notAllocatedImportantReviews: Number(
      process.env.RECURRENCE_HOURS_NUMBER_FOR_IMPORTANT_NOT_ALLOCATED_PRS
    ),
    notAllocatedUrgentReviews: Number(
      process.env.RECURRENCE_MINUTES_NUMBER_FOR_URGENT_NOT_ALLOCATED_PRS
    ),
    allocatedImportantReviews: Number(
      process.env.RECURRENCE_HOURS_NUMBER_FOR_IMPORTANT_ALLOCATED_PRS
    ),
    allocatedUrgentReviews: Number(
      process.env.RECURRENCE_HOURS_NUMBER_FOR_URGENT_ALLOCATED_PRS
    ),
    mainRecurrenceInterval: process.env.RECURENCE_INTERVAL as string,
  },
};
