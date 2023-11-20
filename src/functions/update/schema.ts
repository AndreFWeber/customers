const lambdaSchema = {
  type: "object",
  properties: {
    id: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' }
  },
  required: ['id']
} as const;

const inputValidationSchema = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
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