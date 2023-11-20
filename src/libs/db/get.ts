import { DynamoDB } from 'aws-sdk';
import { ICustomer } from 'src/interfaces/ICustomer';
import config from '@config';

const dynamoDb = new DynamoDB.DocumentClient();
type getDBType = Pick<ICustomer, 'id'>;

const getItem = async (customer: getDBType) => {
  try {
    const params = getItemInput(customer)

    const {Item} = await dynamoDb.get(params).promise();

    return {
      statusCode: Item?200:404,
      body: Item,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: { error: 'Could not get item', details: error },
    };
  }
};

const getItemInput = (customer: getDBType): DynamoDB.DocumentClient.GetItemInput => {
    return {
        TableName: config.tableName,
        Key: {
            id: customer.id,
          }
    };
}

export default getItem