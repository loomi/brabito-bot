import pino, { P } from 'pino';
import pinoEnvironment from './pino-environment';
import { LoggerLocal } from '@/domain/usecases/protocols/logs';

export class PinoLoggerLocalAdapter implements LoggerLocal {
  private readonly pinoInstance: P.Logger = pino({
    enabled: pinoEnvironment.enabled,
    level: pinoEnvironment.level,
    ...(pinoEnvironment.pretty
      ? {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
            },
          },
        }
      : {}),
  });

  logInfo(message: string): void {
    this.pinoInstance.info(message);
  }

  logError(error: Error): void {
    this.pinoInstance.error(error);
  }
}
