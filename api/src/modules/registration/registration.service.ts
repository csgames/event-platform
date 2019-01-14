import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { STSService } from '@polyhx/nest-services';
import { AttendeesService } from '../database/attendees/attendees.service';
import { EventsService } from '../database/events/events.service';
import { CreateUserDto } from './user.dto';
import { CodeException } from '../../filters/code-error/code.exception';

@Injectable()
export class RegistrationService {
    constructor(private readonly stsService: STSService,
                private readonly attendeeService: AttendeesService,
                private readonly eventService: EventsService) {
    }

    public async registerAttendee(userDto: CreateUserDto) {
        try {
            const res = await this.stsService.registerAttendee({
                username: userDto.email,
                password: userDto.password,
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
}
