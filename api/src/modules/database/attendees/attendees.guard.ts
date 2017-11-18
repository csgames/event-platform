import * as express from 'express';
import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import { AttendeesService } from "./attendees.service";
import { CodeException } from "../../../filters/CodedError/code.exception";
import { Code } from "./attendees.exception";

@Guard()
export class CreateAttendeeGuard implements CanActivate {
    constructor(private readonly attendeeService: AttendeesService) { }

    async canActivate(req: express.Request, context: ExecutionContext): Promise<boolean> {
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

@Guard()
export class AttendeesGuard implements CanActivate {
    canActivate(req: express.Request, context: ExecutionContext): boolean {
        if (req.header("token-claim-role") !== 'attendee') {
            throw new CodeException(Code.USER_NOT_ATTENDEE);
        }

        return true;
    }
}
