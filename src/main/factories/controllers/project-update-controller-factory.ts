import { Controller } from '@/application/http-server/protocols';
import { ProjectUpdateController } from '@/application/http-server/controllers';

export const makeProjectUpdateController = (): Controller => {
  const projectUpdateController = new ProjectUpdateController();

  return projectUpdateController;
};
