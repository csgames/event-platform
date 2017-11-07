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
            userPermissions = JSON.parse(req.header("token-claim-permissions"));
        } catch (err) {
            throw new HttpException("Invalid permissions claim", HttpStatus.BAD_REQUEST);
        }

        const permissions = this.reflector.get<string[]>('permissions', context.handler);

        return permissions.every(p => userPermissions.includes(p));
    }
}
