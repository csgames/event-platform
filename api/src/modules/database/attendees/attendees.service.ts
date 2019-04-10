import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ArrayUtils } from '../../../utils/array.utils';
import { Schools } from '../schools/schools.model';
import { Teams } from '../teams/teams.model';
import { Attendees } from './attendees.model';
import { BaseService } from '../../../services/base.service';
import { CreateAttendeeDto, UpdateAttendeeDto, UpdateNotificationDto } from './attendees.dto';
import { StorageService } from '@polyhx/nest-services';
import { EventAttendees, Events } from '../events/events.model';
import { UserModel } from '../../../models/user.model';

export type AttendeeInfo = Attendees & { role: string; permissions: string[], registered: boolean };

@Injectable()
export class AttendeesService extends BaseService<Attendees, CreateAttendeeDto> {
    private sheetHeaders = ['First Name', 'Last Name', 'Email', 'Team', 'School'];

    constructor(@InjectModel('attendees') private readonly attendeesModel: Model<Attendees>,
                @InjectModel('events') private readonly eventsModel: Model<Events>,
                @InjectModel('teams') private readonly teamsModel: Model<Teams>,
                private storageService: StorageService) {
        super(attendeesModel);
    }

    public async getAttendeeInfo(user: UserModel, eventId: string): Promise<AttendeeInfo> {
        const attendee = await this.findOne({email: user.username});
        if (!attendee) {
            throw new NotFoundException();
        }

        if (user.role === 'super-admin') {
            return {
                ...attendee.toJSON(),
                role: user.role,
                permissions: user.permissions,
                registered: true
            };
        }

        const event = await this.eventsModel.findOne({
            _id: eventId
        }).exec();
        if (!event) {
            throw new NotFoundException();
        }

        const attendeeEvent = event.attendees.find(a => (a.attendee as mongoose.Types.ObjectId).equals(attendee._id));
        if (!attendeeEvent) {
            return {
                ...attendee.toJSON(),
                permissions: user.permissions,
                role: user.role,
                registered: false
            };
        }

        return {
            ...attendee.toJSON(),
            permissions: user.permissions,
            role: user.role,
            registered: attendeeEvent.registered
        };
    }

    public async addToken(email: string, token: string): Promise<Attendees> {
        const attendee = await this.findOne({
            email: email
        });

        if (!attendee) {
            throw new NotFoundException('Attendee not found');
        }

        if (attendee.messagingTokens.indexOf(token) >= 0) {
            return;
        }

        return this.attendeesModel.updateOne({
            email: email
        }, {
            $push: {
                messagingTokens: token
            }
        });
    }

    public async removeToken(email: string, token: string): Promise<Attendees> {
        const attendee = await this.findOne({
            email: email
        });

        if (!attendee) {
            throw new NotFoundException('Attendee not found');
        }

        if (attendee.messagingTokens.indexOf(token) < 0) {
            return;
        }

        return this.attendeesModel.updateOne({
            email: email
        }, {
            $pull: {
                messagingTokens: token
            }
        });
    }

    public async updateNotification(email: string, dto: UpdateNotificationDto): Promise<Attendees> {
        const attendee = await this.findOne({
            email: email
        });

        if (!attendee) {
            throw new NotFoundException('Attendee not found');
        }

        if (!attendee.notifications
            .find(x => (x.notification as mongoose.Types.ObjectId).toHexString() === dto.notification)) {
            throw new NotFoundException('Notification not found');
        }

        return this.attendeesModel.updateOne({
            email: email,
            'notifications.notification': dto.notification
        }, {
            'notifications.$.seen': dto.seen
        });
    }

    public async updateAttendeeInfo(conditionOrId: Object | string, dto: UpdateAttendeeDto, file: Express.Multer.File) {
        if (typeof conditionOrId === 'string') {
            conditionOrId = {
                _id: conditionOrId
            };
        }
        const attendee = await this.findOne(conditionOrId);
        if (file) {
            if (attendee.cv) {
                await this.storageService.delete(attendee.cv);
            }
            dto.cv = await this.storageService.upload(file, 'cv');
        } else if (!dto.cv) {
            if (attendee.cv) {
                await this.storageService.delete(attendee.cv);
            }
            dto.cv = null;
        } else {
            delete dto.cv;
        }

        await this.update(conditionOrId, {
            ...dto
        });
    }

    public async getFromEvent(eventId: string, eventAttendees: EventAttendees[], type: string): Promise<any> {
        const ids = eventAttendees.map(x => x.attendee);
        let attendees = await this.attendeesModel.find({
            _id: {
                $in: ids
            }
        }).lean().exec();
        const teams = await this.teamsModel.find({
            attendees: {
                $in: ids
            },
            event: eventId
        }).populate({
            path: 'school'
        }).lean().exec() as Teams[];

        attendees = attendees.map(x => {
            const eventAttendee = eventAttendees.find(a => (a.attendee as mongoose.Types.ObjectId).equals(x._id));
            const team = teams.find(t => t.attendees.some(a => (a as mongoose.Types.ObjectId).equals(x._id)));
            return {
                ...x,
                role: eventAttendee.role,
                registered: eventAttendee.registered,
                teamId: team ? team._id : null,
                team: team ? team.name : null,
                school: team ? (team.school as Schools).name : null
            };
        });
        if (!type || type === 'json') {
            return attendees;
        }

        attendees = attendees.map(x => {
            return {
                firstName: x.firstName,
                lastName: x.lastName,
                email: x.email,
                team: x.team,
                school: x.school
            };
        });

        if (type === 'xlsx') {
            return ArrayUtils.arrayToXlsxBuffer(attendees, 'attendees', this.sheetHeaders);
        } else if (type === 'csv') {
            return await ArrayUtils.arrayToCsvBuffer(attendees, this.sheetHeaders);
        } else {
            return attendees;
        }
    }
}
