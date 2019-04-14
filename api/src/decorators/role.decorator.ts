import { createParamDecorator } from "@nestjs/common";
import { IRequest } from "../models/i-request";

export const Role = createParamDecorator((data: void, req: IRequest) => {
    return req.role;
});
