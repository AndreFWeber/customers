import type { AWS } from '@serverless/typescript';
import config from '@config'
import create from '@functions/create';

const serverlessConfiguration: AWS = {
  service: 'pagaleve',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { create },
  resources: {
    Resources: {
      CustomersTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: `${config.tableName}`,
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
            {
              AttributeName: 'firstName',
              AttributeType: 'S',
            },
            {
              AttributeName: 'lastName',
              AttributeType: 'S',
            },
            {
              AttributeName: 'email',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'firstName', // Add a range key for the Local Secondary Index
              KeyType: 'RANGE',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
          LocalSecondaryIndexes: [
            {
              IndexName: 'FirstNameIndex',
              KeySchema: [
                {
                  AttributeName: 'id', // Same as the base table partition key
                  KeyType: 'HASH',
                },
                {
                  AttributeName: 'firstName', // Sort key for the local index
                  KeyType: 'RANGE',
                },
              ],
              Projection: {
                ProjectionType: 'ALL', // Change as needed
              },
            },
            {
              IndexName: 'LastNameIndex',
              KeySchema: [
                {
                  AttributeName: 'id', // Same as the base table partition key
                  KeyType: 'HASH',
                },
                {
                  AttributeName: 'lastName', // Sort key for the local index
                  KeyType: 'RANGE',
                },
              ],
              Projection: {
                ProjectionType: 'ALL', // Change as needed
              },
            },
            {
              IndexName: 'emailIndex',
              KeySchema: [
                {
                  AttributeName: 'id', // Same as the base table partition key
                  KeyType: 'HASH',
                },
                {
                  AttributeName: 'email', // Sort key for the local index
                  KeyType: 'RANGE',
                },
              ],
              Projection: {
                ProjectionType: 'ALL', // Change as needed
              },
            },
          ],
        },
      },
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
