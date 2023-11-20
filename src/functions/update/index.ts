import { lambdaSchema } from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'put',
        path: 'update',
        request: {
          schemas: {
            'application/json': lambdaSchema,
          },
        },
      },
    },
  ],
};