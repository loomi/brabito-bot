import { adaptRoute } from '@/infra/express/adapters';

import {
  makeCreateUserController,
  makeDeleteUserController,
  makeListUsersController,
  makeUpdateUserController,
} from '@/main/factories/controllers/user';

import { Router } from 'express';

import { authMiddleware } from '@/infra/express/middlewares';

export default (router: Router): void => {
  router
    .route('/user/:id?')
    .get(authMiddleware('USER'), adaptRoute(makeListUsersController()))
    .post(authMiddleware('ADMIN'), adaptRoute(makeCreateUserController()))
    .patch(authMiddleware('USER'), adaptRoute(makeUpdateUserController()))
    .delete(authMiddleware('ADMIN'), adaptRoute(makeDeleteUserController()));
};
