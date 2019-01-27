import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IRequest } from '../models/i-request';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    public canActivate(context: ExecutionContext): boolean {
        let userPermissions;

        const req = context.switchToHttp().getRequest<IRequest>();
        try {
            if (req.header('token-claim-client_permissions')) {
                userPermissions = JSON.parse(req.header('token-claim-client_permissions'));
            } else {
                userPermissions = req.permissions;
            }
        } catch (err) {
            throw new UnauthorizedException('Invalid permissions claim');
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
