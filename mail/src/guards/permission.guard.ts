import * as express from "express";
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    public canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest<express.Request>();
        let userPermissions;
        try {
            if (req.header("token-claim-permissions")) {
                userPermissions = JSON.parse(req.header("token-claim-permissions"));
            } else {
                userPermissions = JSON.parse(req.header("token-claim-client_permissions"));
            }
        } catch (err) {
            throw new HttpException("Invalid permissions claim", HttpStatus.BAD_REQUEST);
        }

        const permissions = this.reflector.get<string[]>("permissions", context.getHandler());

        return permissions.every(p => userPermissions.includes(p));
    }
}
