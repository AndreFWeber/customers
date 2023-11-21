import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import validator from '@middy/validator'
import { transpileSchema } from '@middy/validator/transpile'
import httpErrorHandler from '@middy/http-error-handler'
import eventNormalizer from '@middy/event-normalizer'

export const middyfy = (handler, eventSchema) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(eventNormalizer())
    .use(
      validator({
        //TODO: Pre-transpile the schemas
        eventSchema: transpileSchema(eventSchema)
      })
    )
    .use(httpErrorHandler())
}
