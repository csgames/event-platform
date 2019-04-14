import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { IRequest } from "../../../models/i-request";
import { AttendeeFindErrorException, UserAlreadyAttendeeException } from "./attendees.exception";
import { AttendeesService } from "./attendees.service";

@Injectable()
export class CreateAttendeeGuard implements CanActivate {
    constructor(private readonly attendeeService: AttendeesService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<IRequest>();

        try {
            const attendee = await this.attendeeService.findOne({
                email: req.header("token-claim-username")
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
