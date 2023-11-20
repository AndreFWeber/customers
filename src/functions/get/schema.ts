const lambdaSchema = {
  type: "object",
  properties: {
    id: { type: 'string' }
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
      }
    }
  }
}

export {
  lambdaSchema,
  inputValidationSchema
}