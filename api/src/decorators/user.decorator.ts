import { createParamDecorator } from "@nestjs/common";
import { IRequest } from "../models/i-request";
import { UserModel } from "../models/user.model";

export const User = createParamDecorator((data: void, req: IRequest): UserModel => {
    if (!req.header("token-claim-sub")) {
        return null;
    }
    return {
        id: req.header("token-claim-sub"),
        username: req.header("token-claim-https://api.csgames.org/username"),
        permissions: req.permissions,
        role: req.role
    };
});
