import express from 'express';

import setupMiddlewares from './middlewares';
import setupRoutes from './routes';
import setupSwagger from './swagger';

import { env } from '@/main/config';

const app = express();

if (env.application.mode !== 'production') {
  setupSwagger(app);
}

setupMiddlewares(app);
setupRoutes(app);

export default app;
