import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {lambdaSchema, inputValidationSchema} from './schema';
import getItem from '@libs/db/get';

const getHandler: ValidatedEventAPIGatewayProxyEvent<typeof lambdaSchema> = async (event) => {
  const {body} = event;
  
  // get id from auth?
  const response = await getItem({id: body.id})

  return formatJSONResponse(response.statusCode, response);
};

export const main = middyfy(getHandler, inputValidationSchema);
