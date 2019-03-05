import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import { Model } from 'mongoose';
import { DataTableModel, DataTableReturnModel } from '../../../models/data-table.model';
import { BaseService } from '../../../services/base.service';
import { CreateActivityDto, SendNotificationDto } from './activities.dto';
import { Activities } from './activities.model';
import { NotificationsService } from '../notifications/notifications.service';
import { Events } from '../events/events.model';

@Injectable()
export class ActivitiesService extends BaseService<Activities, CreateActivityDto> {
    constructor(@InjectModel("activities") private readonly activityModel: Model<Activities>,
                @InjectModel("events") private readonly eventModel: Model<Events>,
                private readonly notificationService: NotificationsService) {
        super(activityModel);
    }

    public async filterFrom(activitiesId: string[], filter: DataTableModel): Promise<DataTableReturnModel> {
        const condition = {
            $and: [{
                _id: { $in: activitiesId }
            }]
        };

        let query = this.activityModel.find(condition);
        let data: DataTableReturnModel = <DataTableReturnModel> {
            draw: filter.draw,
            recordsTotal: await query.count().exec()
        };

        let sort = filter.columns[filter.order[0].column].name;
        sort = (filter.order[0].dir === 'asc' ? '+' : '-') + sort;

        const activities = await query.find().sort(sort)
            .limit(filter.length)
            .skip(filter.start)
            .exec();

        data.data = activities;
        data.recordsFiltered = data.recordsTotal;

        return data;
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
                activity: JSON.stringify(activity.toJSON()),
                dynamicLink: `activity/${id}`
            }
        });
    }
}
