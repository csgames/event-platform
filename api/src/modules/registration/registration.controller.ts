import { Body, Controller, HttpStatus, Param, Post, Req } from "@nestjs/common";
import { ValidationPipe } from "../../pipes/validation.pipe";
import { CreateUserDto } from "./user.dto";
import { RegistrationService } from "./registration.service";

@Controller("register")
export class RegistrationController {
    constructor(private readonly registrationService: RegistrationService) { }

    @Post('attendee')
    async registerAttendee(@Body(new ValidationPipe()) user: CreateUserDto) {
        await this.registrationService.registerUser(user, 'attendee');
        return { success: true };
    }
}
