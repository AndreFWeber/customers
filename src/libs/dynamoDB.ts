import { DynamoDB } from 'aws-sdk';
import { ICustomer } from 'src/interfaces/ICustomer';
import config from '@config';
import { randomBytes } from 'crypto';

const dynamoDb = new DynamoDB.DocumentClient();
type editableCustomerType = Pick<ICustomer, 'firstName'|'lastName'|'email'>;
const editableFields = ['firstName','lastName','email']

const createItem = async (customer: editableCustomerType) => {
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

const updateItem = async (customerId:string, customerFields: Partial<editableCustomerType>) => {
  try {
    const params = getUpdateItemInput(customerId, customerFields)

    await dynamoDb.update(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Item created successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create item', details: error }),
    };
  }
};

const getUpdateItemInput = (customerId:string, customerFields: Partial<editableCustomerType>): DynamoDB.DocumentClient.UpdateItemInput => {
  let customerExpression:string = 'set '
  let customerValues:{[fieldName:string]:string} = {
    ':id':customerId
  }

  editableFields.forEach(field => {
    if(customerFields[field]) {
      customerExpression += `${field} = :${field},`
      customerValues[`:${field}`] = customerFields[`${field}`]
    }
  })
  customerExpression = customerExpression.slice(0, -1);

  return {
    TableName: config.tableName,
    Key: {
      id: customerId,
    },
    UpdateExpression: customerExpression,
    ExpressionAttributeValues: customerValues,
    ConditionExpression: 'id = :id',
    ReturnValues: 'ALL_NEW',
  };
  
}

export {
    createItem,
    updateItem
}