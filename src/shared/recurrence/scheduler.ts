export interface Scheduler {
  schedule(task: any, recurrence: string): void;
}
