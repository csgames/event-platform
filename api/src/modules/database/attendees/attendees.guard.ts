import * as express from 'express';
import { Guard, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { AttendeesService } from "./attendees.service";
import { HttpException } from "@nestjs/core";

@Guard()
export class CreateAttendeeGuard implements CanActivate {
    constructor(private readonly attendeeService: AttendeesService) { }

    async canActivate(req: express.Request, context: ExecutionContext): Promise<boolean> {
        if (req.header("token-claim-role") !== 'attendee') {
            throw new HttpException("Only a user with the role attendee can create an attendee",
                HttpStatus.BAD_REQUEST);
        }

        let attendee;
        try {
            attendee = await this.attendeeService.findOne({
                userId: req.header("token-claim-user_id")
            });
        } catch (err) {
            throw new HttpException("Error while finding attendee", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (!attendee) {
            return true;
        }

        throw new HttpException("A user cannot be linked to more than one attendee", HttpStatus.BAD_REQUEST);
    }
}
