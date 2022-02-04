import cors from 'cors';

import { env } from '@/main/config';

const { application, cors: corsOptions } = env;

const permitedUrls =
  application.mode === 'production'
    ? [corsOptions.production.url, corsOptions.production.frontUrl]
    : [corsOptions.stage.url, corsOptions.stage.frontUrl];

const options = application.mode === 'local' ? {} : { origin: permitedUrls };

export const corsMiddleware = cors(options);
