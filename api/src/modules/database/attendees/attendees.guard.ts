import * as express from 'express';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AttendeesService } from "./attendees.service";
import { CodeException } from "../../../filters/CodedError/code.exception";
import { Code } from "./attendees.exception";

@Injectable()
export class CreateAttendeeGuard implements CanActivate {
    constructor(private readonly attendeeService: AttendeesService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<express.Request>();

        if (req.header("token-claim-role") !== 'attendee') {
            throw new CodeException(Code.USER_NOT_ATTENDEE);
        }

        let attendee;
        try {
            attendee = await this.attendeeService.findOne({
                userId: req.header("token-claim-user_id")
            });
        } catch (err) {
            throw new CodeException(Code.ATTENDEE_FIND_ERROR);
        }

        if (!attendee) {
            return true;
        }

        throw new CodeException(Code.USER_IS_ALREADY_ATTENDEE);
    }
}

@Injectable()
export class AttendeesGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest<express.Request>();

        if (req.header("token-claim-role") !== 'attendee') {
            throw new CodeException(Code.USER_NOT_ATTENDEE);
        }

        return true;
    }
}
