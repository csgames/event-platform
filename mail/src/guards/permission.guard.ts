import * as express from "express";
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Auth0Service } from "../modules/auth0/auth0.service";

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly auth0Service: Auth0Service
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<express.Request>();
        const role = req.header("token-claim-https://api.csgames.org/role");
        let userPermissions;
        try {
            const sub = req.header("token-claim-sub");
            if (!sub) {
                return false;
            }
            if (sub.endsWith("@clients")) {
                userPermissions = req.header("token-claim-permissions");
            } else {
                userPermissions = await this.getPermissionFromRole(role);
            }
        } catch (err) {
            throw new HttpException("Invalid permissions claim", HttpStatus.BAD_REQUEST);
        }

        const permissions = this.reflector.get<string[]>("permissions", context.getHandler());

        return permissions.every(p => userPermissions.includes(p));
    }

    private async getPermissionFromRole(name: string): Promise<string[]> {
        const roles = await this.auth0Service.roles.getAllRoles();
        const role = roles.find(x => x.name === name);
        if (!role) {
            return [];
        }
        return this.auth0Service.roles.getRolePermissions(role.id)
            .then(permissions => permissions.map(x => x.permission_name));
    }
}
