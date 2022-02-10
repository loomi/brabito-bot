import { LoggerLocal } from '@/shared/logs';
import { PinoLoggerLocalAdapter } from '@/infra/logs/pino';

export const makePinoLoggerLocalAdapter = (): LoggerLocal => {
  return new PinoLoggerLocalAdapter();
};
