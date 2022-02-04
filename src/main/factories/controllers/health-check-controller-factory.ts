import { Controller } from '@/application/http-server/protocols';
import { HealthCheckController } from '@/application/http-server/controllers';

export const makeHealthCheckController = (): Controller => {
  const healthCheckController = new HealthCheckController();

  return healthCheckController;
};
