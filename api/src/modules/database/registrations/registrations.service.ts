import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { STSService, UserModel } from '@polyhx/nest-services';
import { AttendeesService } from '../attendees/attendees.service';
import { EventsService } from '../events/events.service';
import { CreateRegistrationDto, RegisterAttendeeDto } from './registrations.dto';
import { CodeException } from '../../../filters/code-error/code.exception';
import { Registrations } from './registrations.model';
import { Model } from 'mongoose';
import { EmailService } from '../../email/email.service';
import { ConfigService } from '../../configs/config.service';
import { TeamsService } from '../teams/teams.service';

@Injectable()
export class RegistrationsService {
    private roleTemplate = {
        attendee: 'attendee_account_creation',
        captain: 'captain_account_creation',
        godfather: 'godfather_account_creation'
    };
    private roles: { [name: string]: string };

    constructor(@InjectModel('registrations') private registrationsModel: Model<Registrations>,
                private readonly stsService: STSService,
                private readonly attendeeService: AttendeesService,
                private readonly eventService: EventsService,
                private readonly emailService: EmailService,
                private readonly configService: ConfigService,
                private readonly teamsService: TeamsService) {
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

        if (dto.role === 'captain') {
            // TODO: Create team
        }

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
        if (!this.roles) {
            await this.fetchRoles();
        }

        const registration = await this.registrationsModel.findOne({
            uuid: userDto.uuid,
            event: userDto.eventId
        }).exec();

        if (!registration || registration.used) {
            throw new BadRequestException("Invalid uuid");
        }

        try {
            await this.stsService.registerUser({
                username: userDto.username,
                password: userDto.password,
                roleId: this.roles[registration.role],
            } as UserModel);

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

    private async fetchRoles() {
        const roles = await this.stsService.getRoles().then(x => x.roles);
        if (!roles) {
            return;
        }

        this.roles = {};
        for (const role of roles) {
            this.roles[role.name] = role.id;
        }
    }
}
