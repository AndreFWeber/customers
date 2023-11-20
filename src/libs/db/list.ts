import { DynamoDBClient, ScanCommand, ScanCommandInput } from '@aws-sdk/client-dynamodb';
import config from '@config';

const dynamoDbClient = new DynamoDBClient({ region: config.region });

const listItem = async (paginationKey?: string) => {
  try {
    const params = listItemInput(paginationKey)

    const command = new ScanCommand(params);
    const { Items, LastEvaluatedKey } = await dynamoDbClient.send(command);

    return {
      statusCode: 200,
      body: {Items, paginationKey:LastEvaluatedKey?.id?.S},
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: { error: 'Could not list items', details: error },
    };
  }
};

const listItemInput = (paginationKey?: string)  => {
    const params: ScanCommandInput = {
        TableName: config.tableName,
        Limit: config.pageSize,
    };

    if(paginationKey) {
      params.ExclusiveStartKey = {id:{S:paginationKey}}
    }

    return params
}

export default listItem