import { LoggerErrorCloud } from '@/shared/logs';
import { SentryLoggerErrorCloudAdapter } from '@/infra/logs/sentry';

export const makeSentryLoggerErrorCloudAdapter = (): LoggerErrorCloud => {
  return new SentryLoggerErrorCloudAdapter();
};
