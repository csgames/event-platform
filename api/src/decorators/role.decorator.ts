import { createParamDecorator } from '@nestjs/common';
import { RequestModel } from '../models/request.model';

export const Role = createParamDecorator((data: void, req: RequestModel) => {
    return req.user ? req.user.role : null;
});
