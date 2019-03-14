import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { isNullOrUndefined } from 'util';
import { UserModel } from '../../../models/user.model';
import { BaseService } from '../../../services/base.service';
import { CreateActivityDto } from '../activities/activities.dto';
import { Activities } from '../activities/activities.model';
import { ActivitiesService } from '../activities/activities.service';
import { AttendeeNotifications, Attendees } from '../attendees/attendees.model';
import { AttendeesService } from '../attendees/attendees.service';
import { Competitions, CompetitionsUtils } from '../competitions/competitions.model';
import { Notifications } from '../notifications/notifications.model';
import { NotificationsService } from '../notifications/notifications.service';
import { AddScannedAttendee, AddSponsorDto, CreateEventDto, SendNotificationDto } from './events.dto';
import { AttendeeAlreadyRegisteredException, EventNotFoundException, UserNotAttendeeException } from './events.exception';
import { Events, EventSponsorDetails } from './events.model';
import { UpdateAttendeeDto } from '../attendees/attendees.dto';
import { Teams } from '../teams/teams.model';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

@Injectable()
export class EventsService extends BaseService<Events, CreateEventDto> {
    constructor(@InjectModel('events') private readonly eventsModel: Model<Events>,
                @InjectModel('teams') private readonly teamsModel: Model<Teams>,
                @InjectModel('competitions') private readonly competitionsModel: Model<Competitions>,
                private readonly attendeeService: AttendeesService,
                private readonly activitiesService: ActivitiesService,
                private readonly notificationService: NotificationsService) {
        super(eventsModel);
    }

    public async getEventList(): Promise<Events[]> {
        return await this.eventsModel.find().select({
            name: true,
            imageUrl: true,
            beginDate: true,
            endDate: true,
            details: true,
            coverUrl: true,
            attendees: true,
            teamEditLocked: true,
            teamEditLockDate: true,
            flashoutBeginDate: true,
            flashoutEndDate: true
        }).exec();
    }

    public async addAttendee(eventId: string, userIdOrAttendee: string | Attendees, role: string): Promise<Events> {
        let attendee: Attendees;
        if (typeof userIdOrAttendee === 'string') {
            attendee = await this.attendeeService.findOne({
                userId: userIdOrAttendee
            });
        } else {
            attendee = userIdOrAttendee;
        }

        if (!attendee) {
            throw new UserNotAttendeeException();
        }

        const attendeeAlreadyRegistered = (await this.eventsModel.countDocuments({
            _id: eventId,
            'attendees.attendee': attendee._id
        }).exec()) > 0;

        if (attendeeAlreadyRegistered) {
            throw new AttendeeAlreadyRegisteredException();
        }

        return this.eventsModel.updateOne({
            _id: eventId
        }, {
            $push: {
                attendees: {
                    attendee: attendee._id,
                    role: role
                }
            }
        }).exec();
    }

    public async hasAttendeeForUser(eventId: string, userId: string): Promise<boolean> {
        const attendee = await this.attendeeService.findOne({userId});

        if (!attendee) {
            throw new UserNotAttendeeException();
        }

        return this.hasAttendee(eventId, attendee._id);
    }

    public async hasAttendee(eventId: string, attendeeId: string): Promise<boolean> {
        const occurrencesOfAttendee = await this.eventsModel.count({
            _id: eventId,
            'attendees.attendee': attendeeId
        }).exec();

        return occurrencesOfAttendee > 0;
    }

    public async createActivity(id: string, dto: CreateActivityDto): Promise<Events> {
        const event = await this.findById(id);
        if (!event) {
            throw new EventNotFoundException();
        }

        const activity = await this.activitiesService.create(dto);
        event.activities.push(activity._id);
        return await event.save();
    }

    public async getActivities(eventId: string, user: UserModel): Promise<Activities[]> {
        const event = await this.findById(eventId);
        if (!event) {
            throw new EventNotFoundException();
        }

        return await this.activitiesService.findByIds(event.activities as string[], user);
    }

    public async getSponsors(eventId: string): Promise<{ [tier: string]: EventSponsorDetails[] }> {
        const event = await this.eventsModel.findOne({
            _id: eventId
        }).select('sponsors').populate('sponsors.sponsor').exec();
        const sponsors = event.sponsors;
        const result: { [tier: string]: EventSponsorDetails[] } = {};

        for (const sponsor of sponsors) {
            if (!result[sponsor.tier]) {
                result[sponsor.tier] = [];
            }
            result[sponsor.tier].push({
                ...(sponsor.sponsor as any)._doc,
                web: sponsor.web,
                mobile: sponsor.mobile
            } as EventSponsorDetails);
        }

        return result;
    }

    public async addSponsor(eventId: string, dto: AddSponsorDto): Promise<Events> {
        return await this.eventsModel.updateOne({
            _id: eventId
        }, {
            $push: {
                sponsors: dto
            }
        }).exec();
    }

    public async addScannedAttendee(eventId: string, attendeeId: string, scanInfo: AddScannedAttendee) {
        if (attendeeId === scanInfo.scannedAttendee) {
            throw new BadRequestException('An attendee cannot scan itself');
        }

        const event = await this.eventsModel.findById(eventId).exec();
        if (!event) {
            throw new EventNotFoundException();
        }

        const attendee = event.attendees.find(x => {
            return (x.attendee as mongoose.Types.ObjectId).toHexString() === attendeeId;
        });
        if (!attendee) {
            throw new NotFoundException('Attendee not found in event');
        }

        const scanned = event.attendees.find(x => {
            return (x.attendee as mongoose.Types.ObjectId).toHexString() === scanInfo.scannedAttendee;
        });
        if (!scanned) {
            throw new NotFoundException('Scanned attendee not found in event');
        }

        if (attendee.scannedAttendees.indexOf(scanInfo.scannedAttendee) >= 0) {
            throw new BadRequestException('Scanned attendee already scanned by attendee');
        }

        await this.eventsModel.update({
            '_id': eventId,
            'attendees.attendee': attendeeId
        }, {
            $push: {
                'attendees.$.scannedAttendees': scanInfo.scannedAttendee
            }
        }).exec();
    }

    public async createNotification(id: string, message: SendNotificationDto) {
        const event = await this.eventsModel.findOne({
            _id: id
        }).exec();
        const ids = event.attendees.map(x => x.attendee);

        await this.notificationService.create({
            ...message,
            event: id,
            attendees: ids,
            data: {
                type: 'event',
                event: JSON.stringify({
                    _id: event._id,
                    name: event.name
                }),
                dynamicLink: `event/${id}`
            }
        });
    }

    public async getNotifications(id: string, email: string, seen?: boolean): Promise<AttendeeNotifications[]> {
        const notifications = await this.notificationService.find({
            event: id
        });

        if (!notifications.length) {
            return [];
        }

        const attendee = await this.attendeeService.findOne({
            email
        }, {
            model: 'notifications',
            path: 'notifications.notification',
            select: '-tokens'
        });

        if (!attendee) {
            return [];
        }

        const notificationIds = notifications.map(x => (x._id as mongoose.Types.ObjectId).toHexString());
        return attendee.notifications.filter(x => {
            if (!isNullOrUndefined(seen) && x.seen !== seen || !x.notification) {
                return false;
            }
            return notificationIds.includes((x.notification as Notifications)._id.toHexString());
        });
    }

    public async sendSms(id: string, text: string) {
        const event = await this.findById(id);
        if (!event) {
            throw new EventNotFoundException();
        }

        const ids = event.attendees.map(x => x.attendee);
        const attendees = await this.attendeeService.find({
            _id: {
                $in: ids
            }
        });
        const numbers = attendees.filter(x => x.acceptSMSNotifications).map(x => x.phoneNumber);
        await this.notificationService.sendSms(numbers, text);
    }

    public async confirmAttendee(id: string, email: string, dto: UpdateAttendeeDto, file: Express.Multer.File) {
        const attendee = await this.attendeeService.findOne({
            email
        });
        if (!attendee) {
            throw new UserNotAttendeeException();
        }

        await this.eventsModel.updateOne({
            _id: id,
            'attendees.attendee': attendee._id
        }, {
            'attendees.$.registered': true
        }).exec();

        await this.attendeeService.updateAttendeeInfo({
            email
        }, dto, file);
    }

    public async getAttendeeRole(eventId: string, attendeeId: string): Promise<string> {
        const event = await this.findById(eventId);
        if (!event) {
            throw new EventNotFoundException();
        }

        const attendee = event.attendees.find(x => (x.attendee as mongoose.Types.ObjectId).equals(attendeeId));
        if (!attendee) {
            return null;
        }
        return attendee.role;
    }

    public async getCompetitions(eventId: string, user: UserModel): Promise<Competitions[]> {
        let competitions = await this.competitionsModel.find({
            event: eventId
        }).select({
            activities: true,
            isLive: true,
            onDashboard: true
        }).populate({
            path: 'activities',
            model: 'activities'
        }).exec();

        if (user.role.endsWith('admin')) {
            return competitions;
        }

        const attendee = await this.attendeeService.findOne({
            email: user.username
        });
        competitions = competitions.map(competition => {
            const c = competition.toJSON();
            c.activities = ActivitiesService.formatActivities(c.activities, attendee);
            c.isLive = CompetitionsUtils.isLive(competition);
            return c;
        });

        return competitions;
    }

    public async getCompetitionsAsMember(eventId: string, user: UserModel): Promise<Competitions[]> {
        let competitions = await this.competitionsModel.find({
            event: eventId
        }).select({
            activities: true,
            members: true
        }).populate({
            path: 'activities',
            model: 'activities',
            select: ['name', 'subscribers'],
            options: {
                lean: true
            }
        }).lean().exec();

        if (user.role.endsWith('admin')) {
            return competitions;
        }

        const attendee = await this.attendeeService.findOne({
            email: user.username
        });
        competitions = competitions.filter(competition => {
            return competition.members &&
                competition.members.some(m => m.attendees && m.attendees.some(a => attendee._id.equals(a)));
        }).map(competition => {
            competition.activities = ActivitiesService.formatActivities(competition.activities as any, attendee);
            delete competition.members;
            return competition;
        });

        return competitions;
    }

    public async getAttendeesData(eventId: string, type: string, roles: string[]): Promise<any> {
        const event = await this.findById(eventId);
        if (!event) {
            throw new EventNotFoundException();
        }

        const attendees = roles && roles.length ?
            event.attendees.filter(x => roles.some(role => role === x.role)) :
            event.attendees;

        return await this.attendeeService.getFromEvent(eventId, attendees, type);
    }
}
