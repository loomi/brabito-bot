export const loginSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
  },
};

export const firstLoginSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      required: true,
    },
    newPassword: {
      type: 'string',
      required: true,
    },
    temporaryPassword: {
      type: 'string',
      required: true,
    },
  },
};
