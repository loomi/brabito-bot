import { adaptRoute } from '@/infra/express/adapters';

import {
  makeConfirmForgotPasswordController,
  makeFirstFirstLoginController,
  makeForgotPasswordController,
  makeLoginController,
  makeRefreshTokenController,
} from '@/main/factories/controllers/auth';

import { Router } from 'express';

export default (router: Router): void => {
  router.route('/auth/login').post(adaptRoute(makeLoginController()));

  router
    .route('/auth/refresh-token')
    .post(adaptRoute(makeRefreshTokenController()));

  router
    .route('/auth/first-login')
    .post(adaptRoute(makeFirstFirstLoginController()));

  router
    .route('/auth/forgot-password')
    .post(adaptRoute(makeForgotPasswordController()));

  router
    .route('/auth/confirm-forgot-password')
    .post(adaptRoute(makeConfirmForgotPasswordController()));
};
