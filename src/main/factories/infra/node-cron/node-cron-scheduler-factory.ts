import { Scheduler } from '@/domain/usecases/protocols/recurrence';
import { NodeCronScheduler } from '@/infra/node-cron';

export const makeNodeCronScheduler = (): Scheduler => {
  return new NodeCronScheduler();
};
