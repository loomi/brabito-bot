import { env } from '@/main/config';

const protocolMap = ['http', 'https'];
const urlMap = [`localhost:${env.httpServer.port}`, env.cors.stage.url];

const protocol =
  env.application.mode === 'local' ? protocolMap[0] : protocolMap[1];

const url = env.application.mode === 'local' ? urlMap[0] : urlMap[1];

export const servers = [
  {
    url: '{protocol}://{url}',
    variables: {
      url: {
        enum: urlMap,
        default: url,
      },
      protocol: {
        enum: protocolMap,
        default: protocol,
      },
    },
  },
];
