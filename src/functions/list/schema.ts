const lambdaSchema = {
  type: "object",
  properties: {
    paginationKey: { type: 'string' }
  },
  required: []
} as const;

const inputValidationSchema = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: [],
      properties: {
        paginationKey: { type: 'string' },
      }
    }
  }
}

export {
  lambdaSchema,
  inputValidationSchema
}