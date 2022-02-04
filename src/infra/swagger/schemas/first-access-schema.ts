export const firstAccessSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
    temporaryPassword: {
      type: 'string',
    },
    newPassword: {
      type: 'string',
    },
  },
};
