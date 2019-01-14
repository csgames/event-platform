import { createParamDecorator } from '@nestjs/common';
import * as express from 'express';

export const User = createParamDecorator((data: void, req: express.Request) => {
    if (!req.header('token-claim-user_id')) {
        return null;
    }
    return  {
        id: req.header('token-claim-user_id'),
        username: req.header('token-claim-name'),
        firstName: req.header('token-claim-firstName'),
        lastName: req.header('token-claim-lastName'),
        role: req.header('token-claim-role'),
        permissions: JSON.parse(req.header('token-claim-permissions'))
    };
});
