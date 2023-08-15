import 'module-alias/register';

import { env } from '@/main/config';

import { expressHttpServer } from '@/infra/express';
import { discordBot } from '@/infra/discord';
import { prismaConnector } from '@/infra/database/orm/prisma';

import { makePinoLoggerLocalAdapter } from './factories/infra/logs/pino';
import { makeSentryLoggerErrorCloudAdapter } from './factories/infra/logs/sentry';
import { makeNodeCronScheduler } from './factories/infra/node-cron';
import { makeChargeForReviewersService } from './factories/usecases/pr';

const exitStatus = {
  Failure: 1,
  Success: 0,
};

process.setMaxListeners(20);

const loggerLocal = makePinoLoggerLocalAdapter();
const loggerErrorCloud = makeSentryLoggerErrorCloudAdapter();
const chargeForReviews = makeChargeForReviewersService();

process.on('unhandledRejection', (reason, promise) => {
  const error = new Error(
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`
  );

  loggerLocal.logError(error);
  loggerErrorCloud.log(error);

  throw reason;
});

process.on('uncaughtException', (error) => {
  loggerLocal.logError(error);
  loggerErrorCloud.log(error);

  process.exit(exitStatus.Failure);
});

async function main() {
  try {
    prismaConnector.connect();
    loggerLocal.logInfo(
      `Prisma connect with success to ${env.databases.prisma.databaseUrl}`
    );

    const scheduler = makeNodeCronScheduler();
    scheduler.schedule(() => {
      chargeForReviews.chargeReviewers({ origin: 'back' });
      chargeForReviews.chargeReviewers({ origin: 'front' });
      chargeForReviews.chargeReviewers({ origin: 'flutter' });
      loggerLocal.logInfo(
        `Bot runnig til ${new Date().toLocaleDateString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}}`
      );
    }, env.scheduler.mainRecurrenceInterval);

    expressHttpServer.listen(env.httpServer.port, () =>
      loggerLocal.logInfo(
        `Server runing at http://localhost:${env.httpServer.port}`
      )
    );

    await discordBot.start();
    loggerLocal.logInfo('Brabito is on to listen your wishes!');

    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    exitSignals.map((sig) =>
      process.on(sig, async () => {
        try {
          expressHttpServer.close();
          await prismaConnector.disconnect();
          discordBot.close();

          loggerLocal.logInfo('App exit with success');
          process.exit(exitStatus.Success);
        } catch (error) {
          const errorWithType = error as Error;

          loggerLocal.logError(errorWithType);

          loggerErrorCloud.log(errorWithType);

          process.exit(exitStatus.Failure);
        }
      })
    );
  } catch (error) {
    const errorWithType = error as Error;

    loggerLocal.logError(errorWithType);

    loggerErrorCloud.log(errorWithType);

    process.exit(exitStatus.Failure);
  }
}

main();
