import { DynamoDB } from 'aws-sdk';
import { ICustomer } from 'src/interfaces/ICustomer';
import config from '@config';
import { randomBytes } from 'crypto';

const dynamoDb = new DynamoDB.DocumentClient();
type CreateItemType = Pick<ICustomer, 'firstName'|'lastName'|'email'>;

const createItem = async (customer: CreateItemType) => {
  try {
    const params = getPutItemInput({
        id: randomBytes(config.idHashSize).toString('hex'),
        ...customer
    })

    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Item created successfully' }),
    };
  } catch (error) {
    if(error.code === 'ConditionalCheckFailedException') {
      return createItem(customer)
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create item', details: error }),
    };
  }
};

const getPutItemInput = (customer:ICustomer): DynamoDB.DocumentClient.PutItemInput => {
    return {
        TableName: config.tableName,
        Item: customer,      
        ConditionExpression: 'attribute_not_exists(id)',
    };
}

export {
    createItem
}