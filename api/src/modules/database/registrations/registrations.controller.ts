import { Body, Controller, Post } from "@nestjs/common";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { RegistrationsService } from "./registrations.service";
import { RegisterAttendeeDto } from "./registrations.dto";
import { PublicRoute } from 'nestjs-jwt2';

@Controller("registration")
export class RegistrationsController {
    constructor(private readonly registrationService: RegistrationsService) { }

    @Post('attendee')
    @PublicRoute()
    public async registerAttendee(@Body(new ValidationPipe()) user: RegisterAttendeeDto) {
        await this.registrationService.registerAttendee(user);
    }
}
