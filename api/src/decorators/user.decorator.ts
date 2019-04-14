import { createParamDecorator } from "@nestjs/common";
import { IRequest } from "../models/i-request";
import { UserModel } from "../models/user.model";

export const User = createParamDecorator((data: void, req: IRequest): UserModel => {
    if (!req.header("token-claim-user_id")) {
        return null;
    }
    return {
        id: req.header("token-claim-user_id"),
        username: req.header("token-claim-name"),
        permissions: req.permissions,
        role: req.role
    };
});
