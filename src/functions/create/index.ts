import { lambdaSchema } from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'v1/create',
        request: {
          schemas: {
            'application/json': lambdaSchema,
          },
        },
      },
    },
  ],
};
