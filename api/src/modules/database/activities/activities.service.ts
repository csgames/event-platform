import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { DataTableModel, DataTableReturnModel } from '../../../models/data-table.model';
import { UserModel } from '../../../models/user.model';
import { BaseService } from '../../../services/base.service';
import { Attendees } from '../attendees/attendees.model';
import { CreateActivityDto, SendNotificationDto } from './activities.dto';
import { Activities } from './activities.model';
import { NotificationsService } from '../notifications/notifications.service';
import { Events } from '../events/events.model';

@Injectable()
export class ActivitiesService extends BaseService<Activities, CreateActivityDto> {
    constructor(@InjectModel("activities") private readonly activityModel: Model<Activities>,
                @InjectModel("events") private readonly eventModel: Model<Events>,
                @InjectModel("attendees") private readonly attendeeModel: Model<Attendees>,
                private readonly notificationService: NotificationsService) {
        super(activityModel);
    }

    public async findByIds(activitiesId: string[], user: UserModel): Promise<Activities[]> {
        const activities = await this.activityModel.find({
            _id: { $in: activitiesId }
        }).lean().exec();

        if (user.role.endsWith("admin") || user.role === "volunteer") {
            return activities;
        }

        const attendee = await this.attendeeModel.findOne({
            email: user.username
        }).exec();
        return ActivitiesService.formatActivities(activities, attendee);
    }

    public async getAttendeeSubscription(activityId: string, attendeeId: string) {
        const activity = await this.activityModel.findOne({
            _id: activityId,
            subscribers: {
                $in: [attendeeId]
            }
        }).exec();

        if (!activity) {
            throw new NotFoundException("No subscription found");
        }
    }

    public async subscribeAttendee(activityId: string, attendeeId: string) {
        const activity = await this.activityModel.findOne({
            _id: activityId
        }).exec();

        if (!activity) {
            throw new NotFoundException("No activity found");
        }

        if (activity.subscribers.find(x => (x as Mongoose.Types.ObjectId).toHexString() === attendeeId)) {
            return;
        }

        await this.activityModel.update({
            _id: activityId
        }, {
            $push: {
                subscribers: attendeeId
            }
        }).exec();
    }

    public async unsubscribeAttendee(activityId: string, attendeeId: string) {
        const activity = await this.activityModel.findOne({
            _id: activityId
        }).exec();

        if (!activity) {
            throw new NotFoundException("No activity found");
        }

        if (!activity.subscribers.find(x => (x as Mongoose.Types.ObjectId).toHexString() === attendeeId)) {
            return;
        }

        await this.activityModel.update({
            _id: activityId
        }, {
            $pull: {
                subscribers: attendeeId
            }
        }).exec();
    }

    public async createNotification(id: string, message: SendNotificationDto) {
        const activity = await this.findById(id);

        if (!activity || !activity.subscribers.length) {
            return;
        }

        const event = await this.eventModel.findOne({
            activities: activity._id
        });

        await this.notificationService.create({
            ...message,
            attendees: activity.subscribers,
            event: event._id,
            data: {
                type: "activity",
                activity: JSON.stringify({
                    _id: activity._id,
                    name: activity.name,
                    type: activity.type
                }),
                dynamicLink: `activity/${id}`
            }
        });
    }

    public static formatActivities(activities: (Activities & { subscribed: boolean })[], attendee: Attendees) {
        return activities.map(activity => {
            activity.subscribed = activity.subscribers.some(x => (x as Types.ObjectId).equals(attendee._id));
            delete activity.subscribers;
            delete activity.attendees;
            return activity;
        });
    }
}
