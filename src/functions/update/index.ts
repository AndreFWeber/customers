import { lambdaSchema } from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'put',
        path: 'v1/update',
        request: {
          schemas: {
            'application/json': lambdaSchema,
          },
        },
      },
    },
  ],
};
