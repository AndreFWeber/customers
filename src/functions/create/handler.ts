import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {lambdaSchema, inputValidationSchema} from './schema';
import { createItem } from '@libs/dynamoDB';

const create: ValidatedEventAPIGatewayProxyEvent<typeof lambdaSchema> = async (event) => {
  const {body} = event;

  const response = await createItem({
    firstName: body.firstName,
    lastName: body.lastName,
    email: <string>body.email
  })

  return formatJSONResponse(response.statusCode, response);
};

export const main = middyfy(create, inputValidationSchema);
