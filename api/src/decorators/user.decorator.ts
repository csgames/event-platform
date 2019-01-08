import { createParamDecorator } from '@nestjs/common';
import { RequestModel } from '../models/request.model';

export const User = createParamDecorator((data: void, req: RequestModel) => {
    return req.user;
});
