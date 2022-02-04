import * as Sentry from '@sentry/node';

import { LoggerErrorCloud } from '@/domain/usecases/protocols/logs/logger-error-cloud';
import sentryEnvironment from './sentry-environment';

export class SentryLoggerErrorCloudAdapter implements LoggerErrorCloud {
  private hasSetuped: boolean = false;

  setup() {
    Sentry.init({
      dsn: sentryEnvironment.dns,
      environment: sentryEnvironment.environment,
      tracesSampleRate: 1.0,
    });

    this.hasSetuped = true;
  }

  log(error: Error): void {
    if (this.hasSetuped === false) {
      this.setup();
    }

    const transaction = Sentry.startTransaction({
      op: error.stack,
      name: error.name,
    });

    Sentry.captureException(error);

    transaction.finish();
  }
}
