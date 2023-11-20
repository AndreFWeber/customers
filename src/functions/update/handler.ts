import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {lambdaSchema, inputValidationSchema} from './schema';
import { createItem } from '@libs/dynamoDB';

const create: ValidatedEventAPIGatewayProxyEvent<typeof lambdaSchema> = async (event) => {
  const {body} = event;

  await createItem({
    firstName: body.firstName,
    lastName: body.lastName,
    email: <String>body.email
  })

  return formatJSONResponse({
    message: `create ${event}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(create, inputValidationSchema);
