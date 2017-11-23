import * as express from 'express';
import { Guard, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { Reflector, HttpException } from '@nestjs/core';

@Guard()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    canActivate(req: express.Request, context: ExecutionContext): boolean {
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

        const permissions = this.reflector.get<string[]>('permissions', context.handler);

        return permissions.every(p => userPermissions.includes(p));
    }
}
