import { adaptMiddleware } from '@/infra/express/adapters';
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth';

export const authMiddleware = (role: 'ADMIN' | 'USER') => {
  return adaptMiddleware(makeAuthMiddleware(role));
};
