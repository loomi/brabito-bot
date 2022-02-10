import { Scheduler } from '@/shared/recurrence';
import { NodeCronScheduler } from '@/infra/node-cron';

export const makeNodeCronScheduler = (): Scheduler => {
  return new NodeCronScheduler();
};
