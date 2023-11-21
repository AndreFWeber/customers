const lambdaSchema = {
  type: "object",
  properties: {
    paginationKey: { type: 'string' }
  },
  required: []
} as const;

const inputValidationSchema = {
  type: 'object',
  required: [],
  properties: {
    queryStringParameters: {
      type: 'object',
      required: [],
      properties: {
        paginationKey: { type: 'string', maxLength: 40, minLength:39 },
      }
    }
  }
}

export {
  lambdaSchema,
  inputValidationSchema
}