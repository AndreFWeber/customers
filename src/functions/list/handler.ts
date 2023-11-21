import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {lambdaSchema, inputValidationSchema} from './schema';
import listItem from '@libs/db/list';

const listHandler: ValidatedEventAPIGatewayProxyEvent<typeof lambdaSchema> = async (event) => {
  const { queryStringParameters } = event;
  
  // get id from auth?
  const response = await listItem(queryStringParameters?.paginationKey)

  return formatJSONResponse(response.statusCode, response);
};

export const main = middyfy(listHandler, inputValidationSchema);
