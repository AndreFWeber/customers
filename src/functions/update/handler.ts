import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {lambdaSchema, inputValidationSchema} from './schema';
import { updateItem } from '@libs/dynamoDB';

const update: ValidatedEventAPIGatewayProxyEvent<typeof lambdaSchema> = async (event) => {
  const {body} = event;
  
  // get id from auth?
  const response = await updateItem(
    body.id,
    {
      firstName: body.firstName,
      lastName: body.lastName,
      email: <string>body.email
    }
  )

  return formatJSONResponse(response.statusCode, response);
};

export const main = middyfy(update, inputValidationSchema);
