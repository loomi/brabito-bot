import { tags, servers, securitySchemes } from '@/infra/swagger/helpers';

// import {  } from '@/infra/swagger/paths';

// import { } from '@/infra/swagger/schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Untitled-b API',
    version: '1.0.0',
    description: 'API',
    contact: {
      email: 'tech@loomi.com.br',
    },
  },
  servers,
  tags,
  paths: {
    // ...examplePaths,
  },
  schemas: {
    // exampleSchema: exampleSchema,
  },
  components: {
    securitySchemes,
  },
};
