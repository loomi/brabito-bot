import cron from 'node-cron';
import { Scheduler } from '@/domain/usecases/protocols/recurrence';

export class NodeCronScheduler implements Scheduler {
  schedule(task: any, time: string) {
    cron.schedule(time, task, {
      timezone: 'America/Recife',
    });
  }
}
