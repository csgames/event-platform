import { Body, Controller, Post } from "@nestjs/common";
import { ValidationPipe } from "../../pipes/validation.pipe";
import { RegistrationService } from "./registration.service";
import { CreateUserDto } from "./user.dto";

@Controller("register")
export class RegistrationController {
    constructor(private readonly registrationService: RegistrationService) { }

    @Post('attendee')
    public async registerAttendee(@Body(new ValidationPipe()) user: CreateUserDto) {
        await this.registrationService.registerAttendee(user);
    }
}
