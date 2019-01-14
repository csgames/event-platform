import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { STSService } from '@polyhx/nest-services';
import { GetAllWithIdsResponse } from '@polyhx/nest-services/modules/sts/sts.service';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { isNullOrUndefined } from 'util';
import { DataTableModel, DataTableReturnModel } from '../../../models/data-table.model';
import { BaseService } from '../../../services/base.service';
import { EmailService } from '../../email/email.service';
import { MessagingService } from '../../messaging/messaging.service';
import { CreateActivityDto } from '../activities/activities.dto';
import { Activities } from '../activities/activities.model';
import { ActivitiesService } from '../activities/activities.service';
import { AttendeeNotifications, Attendees } from '../attendees/attendees.model';
import { AttendeesService } from '../attendees/attendees.service';
import { Notifications } from '../notifications/notifications.model';
import { NotificationsService } from '../notifications/notifications.service';
import { Teams } from '../teams/teams.model';
import { AddScannedAttendee, AddSponsorDto, CreateEventDto, SendNotificationDto } from './events.dto';
import {
    AttendeeAlreadyRegisteredException, AttendeeNotSelectedException, EventNotFoundException, UserNotAttendeeException
} from './events.exception';
import { EventAttendeeTypes, Events, EventSponsorDetails } from './events.model';

@Injectable()
export class EventsService extends BaseService<Events, CreateEventDto> {
    constructor(@InjectModel('events') private readonly eventsModel: Model<Events>,
                @InjectModel('teams') private readonly teamsModel: Model<Teams>,
                private readonly attendeeService: AttendeesService,
                private readonly emailService: EmailService,
                private readonly stsService: STSService,
                private readonly activitiesService: ActivitiesService,
                private readonly messagingService: MessagingService,
                private readonly notificationService: NotificationsService) {
        super(eventsModel);
    }

    public async addAttendee(eventId: string, userIdOrAttendee: string | Attendees): Promise<Events> {
        let attendee: Attendees;
        if (typeof userIdOrAttendee === "string") {
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
                    type: EventAttendeeTypes.Attendee
                }
            }
        }).exec();
    }

    public async confirmAttendee(eventId: string, userId: string, attending: boolean) {
        const attendee = await this.attendeeService.findOne({userId});

        if (!attendee) {
            throw new UserNotAttendeeException();
        }

        const event = await this.eventsModel.findOne({
            _id: eventId
        });

        const attendeeRegistration = event.attendees.find(r => r.attendee.toString() === attendee._id.toString());

        if (!attendeeRegistration.selected) {
            throw new AttendeeNotSelectedException();
        }

        event.attendees.splice(event.attendees.indexOf(attendeeRegistration), 1);

        if (attending) {
            attendeeRegistration.confirmed = true;
            attendeeRegistration.declined = false;
        } else {
            attendeeRegistration.confirmed = false;
            attendeeRegistration.declined = true;
        }

        event.attendees.push(attendeeRegistration);
        await event.save();
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

    public async getAttendeeStatus(attendeeId: string, eventId: string): Promise<string> {
        const event = await this.findOne({
            _id: eventId
        });
        return this.getAttendeeStatusFromEvent(attendeeId, event);
    }

    public getAttendeeStatusFromEvent(attendeeId: string, event: Events): string {
        const status = event.attendees.find(a => a.attendee.toString() === attendeeId.toString());
        if (!status) {
            return 'not-registered';
        }
        if (status.present) {
            return 'present';
        } else if (status.confirmed) {
            return 'confirmed';
        } else if (status.declined) {
            return 'declined';
        } else if (status.selected) {
            return 'selected';
        } else {
            return 'registered';
        }
    }

    /**
     * From the attendees of a specified event (null-checked), filters them and returns the result as a promise of
     * DataTableReturnModel.
     */
    public async getFilteredAttendees(eventId: string, dtObject: DataTableModel,
            filter: { school: string[], status: string[] }): Promise<DataTableReturnModel> {
        const event: Events = await this.findOne({
            _id: eventId
        });
        if (!event) {
            throw new EventNotFoundException();
        }

        const attendeeIds: string[] = event.attendees.filter(attendee => {
            if (filter.status.length === 0) {
                return true;
            }

            if (!attendee.selected && filter.status.indexOf('registered') >= 0) {
                return true;
            }
            if (attendee.selected &&
                !attendee.confirmed &&
                !attendee.declined &&
                filter.status.indexOf('selected') >= 0) {
                return true;
            }
            if (attendee.confirmed && filter.status.indexOf('confirmed') >= 0) {
                return true;
            }
            if (attendee.declined && filter.status.indexOf('declined') >= 0) {
                return true;
            }
            if (attendee.present && filter.status.indexOf('present') >= 0) {
                return true;
            }

            return false;
        }).map(x => x.attendee.toString());

        const res = await this.attendeeService.filterFrom(attendeeIds, dtObject, filter);

        for (let attendee of res.data) {
            let a = event.attendees[
                event.attendees.findIndex(value => value.attendee.toString() === attendee._id.toString())
                ];

            if (a.present) {
                attendee.status = 'present';
            } else if (a.confirmed) {
                attendee.status = 'confirmed';
            } else if (a.declined) {
                attendee.status = 'declined';
            } else if (a.selected) {
                attendee.status = 'selected';
            } else {
                attendee.status = 'registered';
            }
        }

        return res;
    }

    public async selectAttendees(eventId, userIds: string[]) {
        const res: GetAllWithIdsResponse = await this.stsService.getAllWithIds(userIds);

        for (const user of res.users) {
            try {
                await this.emailService.sendEmail({
                    from: 'PolyHx <info@polyhx.io>',
                    to: [user.username],
                    subject: 'Hackatown 2019 - Selection',
                    text: 'LHGames 2018 - Selection',
                    html: '<h1>Congrats</h1>',
                    template: 'hackatown2019-selection',
                    variables: {
                        name: user.firstName
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }

        const attendees = await this.attendeeService.find({
            userId: {
                $in: userIds
            }
        });
        for (const attendee of attendees) {
            await this.eventsModel.update({
                '_id': eventId,
                'attendees.attendee': attendee._id
            }, {
                'attendees.$.selected': true
            }).exec();
        }
    }

    public async getFilteredActivities(eventId: string, filter: DataTableModel): Promise<DataTableReturnModel> {
        const event: Events = await this.findOne({_id: eventId});
        if (!event) {
            throw new EventNotFoundException();
        }

        return this.activitiesService.filterFrom(event.activities as string[], filter);
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

    public async getActivities(eventId: string): Promise<Activities[]> {
        const event = await this.findById(eventId);
        if (!event) {
            throw new EventNotFoundException();
        }

        return await this.activitiesService.find({
            _id: {
                $in: event.activities
            }
        });
    }

    public async getStats(eventId: string): Promise<object> {
        const event = await this.findById(eventId);
        const activities = await this.getActivities(eventId);
        const teams = await this.teamsModel.find({event: eventId});

        const stats = {};
        stats['registered'] = event.attendees.length;
        stats['selected'] = event.attendees.filter(a => a.selected).length;
        stats['confirmed'] = event.attendees.filter(a => a.confirmed).length;
        stats['declined'] = event.attendees.filter(a => a.declined).length;
        stats['present'] = event.attendees.filter(a => a.present).length;
        stats['present_teams'] = teams.filter(t => t.present).length;

        stats['activities'] = activities.reduce((acc, a) => Object.assign(acc, {[a.name]: a.attendees.length}), {});

        return stats;
    }

    public async getFilteredSponsors(eventId: string, filter: DataTableModel): Promise<DataTableReturnModel> {
        const event: Events = await this.eventsModel.findOne({
            _id: eventId
        })
            .select('sponsors')
            .populate('sponsors.sponsor')
            .exec();
        if (!event) {
            throw new EventNotFoundException();
        }

        const data: DataTableReturnModel = <DataTableReturnModel> {
            draw: filter.draw,
            recordsTotal: event.sponsors.length
        };

        data.data = event.sponsors
            .filter((value, index) => index >= filter.start && index <= (filter.start + filter.length))
            .map(x => {
                return {
                    ...(x.sponsor as any)._doc,
                    tier: x.tier
                };
            });
        data.recordsFiltered = data.recordsTotal;

        return data;
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
                padding: sponsor.padding,
                widthFactor: sponsor.widthFactor,
                heightFactor: sponsor.heightFactor
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
            throw new BadRequestException("An attendee cannot scan itself");
        }

        const event = await this.eventsModel.findById(eventId).exec();
        if (!event) {
            throw new EventNotFoundException();
        }

        const attendee = event.attendees.find(x => {
            return (x.attendee as mongoose.Types.ObjectId).toHexString() === attendeeId;
        });
        if (!attendee) {
            throw new NotFoundException("Attendee not found in event");
        }

        const scanned = event.attendees.find(x => {
            return (x.attendee as mongoose.Types.ObjectId).toHexString() === scanInfo.scannedAttendee;
        });
        if (!scanned) {
            throw new NotFoundException("Scanned attendee not found in event");
        }

        if (!attendee.present || !scanned.present) {
            throw new BadRequestException("Attendee and scanned attendee must be present");
        }

        if (attendee.scannedAttendees.indexOf(scanInfo.scannedAttendee) >= 0) {
            throw new BadRequestException("Scanned attendee already scanned by attendee");
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
        const ids = event.attendees.filter(x => x.present).map(x => x.attendee);

        await this.notificationService.create({
            ...message,
            event: id,
            attendees: ids,
            data: {
                type: 'event',
                event: event.toJSON().toString(),
                dynamicLink: `event/${id}`
            }
        });
    }

    public async getNotifications(id: string, userId: string, seen?: boolean): Promise<AttendeeNotifications[]> {
        const notifications = await this.notificationService.find({
            event: id
        });

        if (!notifications.length) {
            return [];
        }

        const attendee = await this.attendeeService.findOne({
            userId
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
            if (!isNullOrUndefined(seen) && x.seen !== seen) {
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

        const ids = event.attendees.filter(x => x.present).map(x => x.attendee);
        const attendees = await this.attendeeService.find({
            _id: {
                $in: ids
            }
        });
        const numbers = attendees.filter(x => x.acceptSMSNotifications).map(x => x.phoneNumber);
        await this.notificationService.sendSms(numbers, text);
    }
}
