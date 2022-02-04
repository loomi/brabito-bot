export const filterParams = [
  {
    in: 'query',
    name: 'take',
    schema: {
      type: 'integer',
    },
  },
  {
    in: 'query',
    name: 'skip',
    schema: {
      type: 'integer',
    },
  },
  {
    in: 'query',
    name: 'createdAt',
    schema: {
      type: 'array',
      items: {
        type: 'string',
        format: 'date-time',
        maxItems: 2,
      },
    },
    style: 'form',
    explode: false,
  },
  {
    in: 'query',
    name: 'updatedAt',
    schema: {
      type: 'array',
      items: {
        type: 'string',
        format: 'date-time',
        maxItems: 2,
      },
    },
    style: 'form',
    explode: false,
  },
  {
    in: 'query',
    name: 'orderBy',
    schema: {
      type: 'array',
      items: {
        type: 'string',
        maxItems: 2,
      },
    },
    style: 'form',
    explode: false,
  },
];
