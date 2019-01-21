import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { STSService } from '@polyhx/nest-services';
import { AttendeesService } from '../attendees/attendees.service';
import { EventsService } from '../events/events.service';
import { RegisterAttendeeDto } from './registrations.dto';
import { CodeException } from '../../../filters/code-error/code.exception';
import { BaseService } from '../../../services/base.service';
import { RegistrationsModel } from './registrations.model';
import { Model } from 'mongoose';

@Injectable()
export class RegistrationsService extends BaseService<RegistrationsModel, RegistrationsModel> {
    constructor(@InjectModel('registrations') private registrationsModel: Model<RegistrationsModel>,
                private readonly stsService: STSService,
                private readonly attendeeService: AttendeesService,
                private readonly eventService: EventsService) {
        super(registrationsModel);
    }

    public async registerAttendee(userDto: RegisterAttendeeDto) {
        const registration = await this.registrationsModel.findOne({
            uuid: userDto.uuid,
            event: userDto.eventId
        });

        if (!registration || registration.used) {
            throw new BadRequestException("Invalid uuid");
        }

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

            registration.used = true;
            await registration.save();
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
