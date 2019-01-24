import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Permissions } from '../../../decorators/permission.decorator';
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { CreateRegistrationGuard } from './registrations.guard';
import { Registrations } from './registrations.model';
import { RegistrationsService } from "./registrations.service";
import { CreateRegistrationDto, RegisterAttendeeDto } from './registrations.dto';
import { PublicRoute } from 'nestjs-jwt2';

@Controller("registration")
export class RegistrationsController {
    constructor(private readonly registrationService: RegistrationsService) { }

    @Post()
    @UseGuards(CreateRegistrationGuard)
    @Permissions('csgames-api:create:invitation')
    public async createInvitation(@Body(new ValidationPipe()) dto: CreateRegistrationDto): Promise<Registrations> {
        return await this.registrationService.create(dto);
    }

    @Post('attendee')
    @PublicRoute()
    public async registerAttendee(@Body(new ValidationPipe()) user: RegisterAttendeeDto) {
        await this.registrationService.registerAttendee(user);
    }
}
