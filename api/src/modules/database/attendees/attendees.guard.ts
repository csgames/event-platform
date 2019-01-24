import * as express from 'express';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AttendeesService } from "./attendees.service";
import { AttendeeFindErrorException, UserAlreadyAttendeeException, UserNotAttendeeException } from './attendees.exception';

@Injectable()
export class CreateAttendeeGuard implements CanActivate {
    constructor(private readonly attendeeService: AttendeesService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<express.Request>();

        if (['attendee', 'captain', 'godfather'].includes(req.header("token-claim-role"))) {
            throw new UserNotAttendeeException();
        }

        try {
            const attendee = await this.attendeeService.findOne({
                userId: req.header("token-claim-user_id")
            });
            if (!attendee) {
                return true;
            }
        } catch (err) {
            throw new AttendeeFindErrorException();
        }

        throw new UserAlreadyAttendeeException();
    }
}

@Injectable()
export class AttendeesGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest<express.Request>();

        if (['attendee', 'captain', 'godfather'].includes(req.header("token-claim-role"))) {
            throw new UserNotAttendeeException();
        }

        return true;
    }
}
