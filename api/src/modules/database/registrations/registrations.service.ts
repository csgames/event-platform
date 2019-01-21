import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { STSService } from '@polyhx/nest-services';
import { AttendeesService } from '../attendees/attendees.service';
import { EventsService } from '../events/events.service';
import { CreateRegistrationDto, RegisterAttendeeDto } from './registrations.dto';
import { CodeException } from '../../../filters/code-error/code.exception';
import { RegistrationsModel } from './registrations.model';
import { Model } from 'mongoose';
import { EmailService } from '../../email/email.service';
import { ConfigService } from '../../configs/config.service';

@Injectable()
export class RegistrationsService {
    private roleTemplate = {
        captain: 'captain_account_creation'
    };

    constructor(@InjectModel('registrations') private registrationsModel: Model<RegistrationsModel>,
                private readonly stsService: STSService,
                private readonly attendeeService: AttendeesService,
                private readonly eventService: EventsService,
                private readonly emailService: EmailService,
                private readonly configService: ConfigService) {
    }

    public async create(dto: CreateRegistrationDto) {
        const attendee = await this.attendeeService.create({
            email: dto.email,
            firstName: dto.firstName,
            lastName: dto.lastName
        });

        await this.eventService.addAttendee(dto.eventId, attendee, dto.role);

        let registration = new this.registrationsModel({
            event: dto.eventId,
            attendee: attendee._id,
            role: dto.role
        });
        registration = await registration.save();

        const template = this.roleTemplate[dto.role];
        if (!template) {
            return registration;
        }

        try {
            await this.emailService.sendEmail({
                from: 'CS Games <info@polyhx.io>',
                to: [dto.email],
                subject: 'CS Games Account creation',
                text: 'CS Games Account creation',
                html: '<h1>Account creation</h1>',
                template: template,
                variables: {
                    name: dto.firstName,
                    url: `${this.configService.registration.registrationUrl}/${registration.uuid}`
                }
            });
        } catch (e) {
            if (e instanceof HttpException) {
                throw e;
            }

            throw new InternalServerErrorException(e);
        }

        return registration;
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
            await this.stsService.registerAttendee({
                username: userDto.email,
                password: userDto.password,
                firstName: '',
                lastName: '',
                birthDate: userDto.birthDate
            });

            await this.attendeeService.update({
                _id: registration.attendee
            }, {
                ...userDto.attendee,
                email: userDto.username
            });

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
