import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IRequest } from "../models/i-request";

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    public canActivate(context: ExecutionContext): boolean {
        let userPermissions;

        const req = context.switchToHttp().getRequest<IRequest>();
        try {
            const sub = req.header("token-claim-sub");
            if (!sub) {
                return false;
            }
            if (sub.endsWith("@clients")) {
                userPermissions = req.header("token-claim-permissions");
            } else {
                userPermissions = req.permissions;
            }
        } catch (err) {
            throw new UnauthorizedException("Invalid permissions claim");
        }

        const permissions = this.reflector.get<string[]>("permissions", context.getHandler());

        if (!permissions) {
            return true;
        }

        for (let p of permissions) {
            if (!userPermissions.includes(p)) {
                return false;
            }
        }

        return true;
    }
}
