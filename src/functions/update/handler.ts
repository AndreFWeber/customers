import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {lambdaSchema, inputValidationSchema} from './schema';
import { updateItem } from '@libs/dynamoDB';

const update: ValidatedEventAPIGatewayProxyEvent<typeof lambdaSchema> = async (event) => {
  const {body} = event;
  
  // get id from auth?
  await updateItem(
    body.id,
    {
      firstName: body.firstName,
      lastName: body.lastName,
      email: <string>body.email
    }
  )

  return formatJSONResponse({
    message: `update ${event}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(update, inputValidationSchema);
