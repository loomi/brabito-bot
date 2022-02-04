import { env } from '@/main/config';

export default {
  dns: env.logs.sentry.url,
  environment: env.application.mode,
};
