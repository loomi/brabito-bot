import { Router } from 'express';

import { adaptRoute } from '@/infra/express/adapters';

import { makeProjectUpdateController } from '@/main/factories/controllers';

export default (router: Router): void => {
  router.post('/project-update', adaptRoute(makeProjectUpdateController()));
};
