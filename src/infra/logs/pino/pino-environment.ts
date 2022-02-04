import { env } from '@/main/config';

export default {
  enabled: env.application.mode !== 'test',
  level: env.application.mode === 'production' ? 'info' : 'debug',
  pretty:
    env.application.mode === 'development' || env.application.mode === 'local',
};
