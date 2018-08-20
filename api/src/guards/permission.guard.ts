import * as express from 'express';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    public canActivate(context: ExecutionContext): boolean {
        let userPermissions;

        const req = context.switchToHttp().getRequest<express.Request>();
        try {
            userPermissions = JSON.parse(req.header("token-claim-permissions"));
        } catch (err) {
            throw new HttpException("Invalid permissions claim", HttpStatus.BAD_REQUEST);
        }

        const permissions = this.reflector.get<string[]>('permissions', context.getHandler());

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
