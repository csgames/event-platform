import * as express from 'express';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AttendeesService } from "./attendees.service";
import { CodeException } from "../../../filters/code-error/code.exception";
import { Code } from "./attendees.exception";

@Injectable()
export class CreateAttendeeGuard implements CanActivate {
    constructor(private readonly attendeeService: AttendeesService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<express.Request>();

        if (req.header("token-claim-role") !== 'attendee') {
            throw new CodeException(Code.USER_NOT_ATTENDEE);
        }

        try {
            const attendee = await this.attendeeService.findOne({
                userId: req.header("token-claim-user_id")
            });
            if (!attendee) {
                return true;
            }
        } catch (err) {
            throw new CodeException(Code.ATTENDEE_FIND_ERROR);
        }

        throw new CodeException(Code.USER_IS_ALREADY_ATTENDEE);
    }
}

@Injectable()
export class AttendeesGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest<express.Request>();

        if (req.header("token-claim-role") !== 'attendee') {
            throw new CodeException(Code.USER_NOT_ATTENDEE);
        }

        return true;
    }
}
