const lambdaSchema = {
  type: "object",
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' }
  },
  required: ['id', 'firstName', 'lastName', 'email']
} as const;

const inputValidationSchema = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: ['firstName', 'lastName', 'email'],
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string', format: 'email' }
      }
    }
  }
}

export {
  lambdaSchema,
  inputValidationSchema
}