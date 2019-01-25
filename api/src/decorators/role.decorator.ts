import { createParamDecorator } from '@nestjs/common';
import * as express from 'express';

export const Role = createParamDecorator((data: void, req: express.Request) => {
    return req.header('token-claim-role');
});
