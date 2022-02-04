export const createUserSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
    },
    isAdmin: {
      type: 'boolean',
      required: true,
    },
  },
};

export const updateUserSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      required: false,
    },
    email: {
      type: 'string',
      required: false,
    },
    isAdmin: {
      type: 'boolean',
      required: false,
    },
  },
};
