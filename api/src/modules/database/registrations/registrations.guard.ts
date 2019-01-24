import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import * as express from 'express';
import { CreateRegistrationDto } from './registrations.dto';

@Injectable()
export class CreateRegistrationGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest<express.Request>();
        const body = req.body as CreateRegistrationDto;
        const role = req.header('token-claim-role');

        if (body.role === 'captain' && role === 'captain') {
            throw new ForbiddenException();
        }

        return true;
    }
}
