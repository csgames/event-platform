import { Body, Controller, Post } from "@nestjs/common";
import { ValidationPipe } from "../../pipes/validation.pipe";
import { RegistrationService } from "./registration.service";
import { CreateUserDto } from "./user.dto";
import { PublicRoute } from 'nestjs-jwt2';

@Controller("registration")
export class RegistrationController {
    constructor(private readonly registrationService: RegistrationService) { }

    @Post('attendee')
    @PublicRoute()
    public async registerAttendee(@Body(new ValidationPipe()) user: CreateUserDto) {
        await this.registrationService.registerAttendee(user);
    }
}
