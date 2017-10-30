import * as express from 'express';
import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Guard()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    canActivate(req: express.Request, context: ExecutionContext): boolean {
        if (!req.user) {
            return false;
        }

        const permissions = this.reflector.get<string[]>('permissions', context.handler);

        let userPermissions: string[] = JSON.parse(req.user.permissions);
        for (let p of permissions) {
            if (!userPermissions.includes(p)) {
                return false;
            }
        }

        return true;
    }
}
