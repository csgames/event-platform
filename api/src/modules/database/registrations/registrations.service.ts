import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { STSService, UserModel } from '@polyhx/nest-services';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { CodeException } from '../../../filters/code-error/code.exception';
import { ConfigService } from '../../configs/config.service';
import { EmailService } from '../../email/email.service';
import { Attendees } from '../attendees/attendees.model';
import { AttendeesService } from '../attendees/attendees.service';
import { EventsService } from '../events/events.service';
import { TeamsService } from '../teams/teams.service';
import {
    AttendeeAlreadyExistException, GodParentAlreadyExist, InvalidCodeException, MaxTeamMemberException, TeamAlreadyExistException,
    TeamDoesntExistException
} from './registration.exception';
import { CreateRegistrationDto, RegisterRoleDto, RegisterAttendeeDto } from './registrations.dto';
import { Registrations } from './registrations.model';

@Injectable()
export class RegistrationsService {
    private roleTemplate = {
        attendee: 'attendee_account_creation',
        sponsor: 'attendee_account_creation',
        captain: 'captain_account_creation',
        godparent: 'godparent_account_creation'
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

    public async create(dto: CreateRegistrationDto, role: string, eventId: string) {
        const att = await this.attendeeService.findOne({email: dto.email});
        if (att) {
            throw new AttendeeAlreadyExistException();
        }

        if (dto.role !== 'sponsor') {
            await this.validateTeam(dto.teamName, dto.role, eventId);
        }
        const attendee = await this.attendeeService.create({
            email: dto.email.toLowerCase(),
            firstName: dto.firstName,
            lastName: dto.lastName
        });

        let registration = new this.registrationsModel({
            attendee: attendee._id,
            role: dto.role
        });
        registration = await registration.save();

        if (dto.role === 'sponsor') {
            await this.addSponsor(dto, role, eventId, attendee);
        } else {
            await this.addAttendee(dto, role, eventId, attendee);
        }

        await this.eventService.addAttendee(eventId, attendee, dto.role);

        const template = this.roleTemplate[dto.role];
        if (!template) {
            return registration;
        }

        try {
            await this.emailService.sendEmail({
                from: 'CS Games <info@csgames.org>',
                to: [dto.email],
                subject: 'CS Games Account creation',
                text: 'CS Games Account creation',
                html: '<h1>Account creation</h1>',
                template: template,
                variables: {
                    name: dto.firstName,
                    url: `${this.configService.registration.registrationUrl}${registration.uuid}`,
                    team: dto.teamName
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
            uuid: userDto.uuid
        }).exec();

        if (!registration || registration.used) {
            throw new BadRequestException('Invalid uuid');
        }

        try {
            await this.stsService.registerUser({
                username: userDto.username,
                password: userDto.password,
                roleId: this.roles['attendee']
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

            throw new HttpException('Error while creating attendee', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async registerRole(userDto: RegisterRoleDto, eventId: string): Promise<Attendees> {
        if (!this.roles) {
            await this.fetchRoles();
        }

        try {
            await this.stsService.registerUser({
                username: userDto.username,
                password: userDto.password,
                roleId: this.roles['attendee']
            } as UserModel);

            const attendee = await this.attendeeService.create({
                ...userDto.attendee,
                email: userDto.username
            });
            await this.eventService.addAttendee(eventId, attendee, userDto.role);
            return attendee;
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }
            if (err instanceof CodeException) {
                throw err;
            }

            throw new HttpException('Error while creating attendee', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getRegistrationInfo(uuid: string): Promise<Registrations> {
        const registration = await this.registrationsModel.findOne({
            uuid
        }).populate({
            path: 'attendee',
            model: 'attendees',
            select: ['email', 'firstName', 'lastName']
        });

        if (!registration || registration.used) {
            throw new InvalidCodeException();
        }

        return registration;
    }

    private async validateTeam(name: string, role: string, eventId: string) {
        const team = await this.teamsService.findOne({name: name, event: eventId});
        if (role === 'captain') {
            if (team) {
                throw new TeamAlreadyExistException();
            }
            return;
        } else if (!team) {
            throw new TeamDoesntExistException();
        }

        if (team.attendees.length === team.maxMembersNumber) {
            throw new MaxTeamMemberException();
        }

        const event = await this.eventService.findOne({_id: eventId});
        const attendeeIds = team.attendees.map(x => (x as mongoose.Types.ObjectId).toHexString());
        const members = event.attendees.filter(attendeeEvent => attendeeIds
            .includes((attendeeEvent.attendee as mongoose.Types.ObjectId).toHexString()));

        const godparent = members.filter(attendeeEvent => attendeeEvent.role === 'godparent');
        if (role === 'godparent') {
            if (godparent.length > 0) {
                throw new GodParentAlreadyExist();
            }
        } else {
            const attendees = members.filter(attendeeEvent => attendeeEvent.role !== 'godparent');
            if (attendees.length >= 10) {
                throw new MaxTeamMemberException();
            }
        }
    }

    private async addAttendee(dto: CreateRegistrationDto, role: string, eventId: string, attendee: Attendees) {
        if (dto.role === 'captain' && (role === 'admin' || role === 'super-admin')) {
            await this.teamsService.createTeam({
                name: dto.teamName,
                event: eventId,
                school: dto.schoolId,
                sponsor: null,
                attendeeId: attendee._id,
                maxMembersNumber: dto.maxMembersNumber
            });
        } else {
            await this.teamsService.update({name: dto.teamName, event: eventId}, {
                $push: {
                    attendees: attendee._id
                }
            } as any);
        }
    }

    private async addSponsor(dto: CreateRegistrationDto, role: string, eventId: string, attendee: Attendees) {
        const team = await this.teamsService.findOne({
            sponsor: dto.sponsorId,
            event: eventId
        });
        if (!team) {
            await this.teamsService.createTeam({
                name: dto.teamName,
                event: eventId,
                school: null,
                sponsor: dto.sponsorId,
                attendeeId: attendee._id,
                maxMembersNumber: dto.maxMembersNumber
            });
        } else {
            await this.teamsService.update({sponsor: dto.sponsorId, event: eventId}, {
                $push: {
                    attendees: attendee._id
                }
            } as any);
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
