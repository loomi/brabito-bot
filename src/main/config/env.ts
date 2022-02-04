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
  databases: {
    postgres: {
      url: process.env.DATABASE_URL as string,
    },
  },
  logs: {
    sentry: {
      url: process.env.SENTRY_URL as string,
    },
  },
  cloud: {
    cognito: {
      apiVersion: process.env.COGNITO_API_VERSION as string,
      region: process.env.COGNITO_REGION as string,
      accessKeyId: process.env.COGNITO_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.COGNITO_SECRET_ACCESS_KEY as string,
      clientId: process.env.COGNITO_CLIENT_ID as string,
      userPoolId: process.env.COGNITO_USER_POOL_ID as string,
    },
  },
};
