import { LoggerLocal } from '@/domain/usecases/protocols/logs';
import { PinoLoggerLocalAdapter } from '@/infra/logs/pino';

export const makePinoLoggerLocalAdapter = (): LoggerLocal => {
  return new PinoLoggerLocalAdapter();
};
