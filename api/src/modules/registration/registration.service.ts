import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { STSService } from '@polyhx/nest-services';
import { AttendeesService } from '../database/attendees/attendees.service';
import { EventsService } from '../database/events/events.service';
import { CreateUserDto } from './user.dto';
import { CodeException } from '../../filters/code-error/code.exception';

@Injectable()
export class RegistrationService {
    private roles: { [key: string]: string } = {};
    constructor(private readonly stsService: STSService,
                private readonly attendeeService: AttendeesService,
                private readonly eventService: EventsService) {
    }

    public async registerAttendee(userDto: CreateUserDto) {
        if (!this.roles) {
            await this.fetchRoles();
        }

        try {
            const res = await this.stsService.registerUser({
                roleId: this.roles['attendee'],
                email: userDto.email,
                username: userDto.email,
                firstName: userDto.firstName,
                lastName: userDto.lastName,
                birthDate: userDto.birthDate
            });
            const attendee = await this.attendeeService.create({
                ...userDto.attendee,
                userId: res.userId
            });
            await this.eventService.addAttendee(userDto.eventId, attendee);
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }
            if (err instanceof CodeException) {
                throw err;
            }

            throw new HttpException("Error while creating attendee", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async fetchRoles() {
        const roles = (await this.stsService.getRoles()).roles;

        for (const role of roles) {
            this.roles[role.name] = role.id;
        }
    }
}
