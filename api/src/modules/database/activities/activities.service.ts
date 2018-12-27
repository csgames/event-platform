import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import { Model } from 'mongoose';
import { DataTableInterface, DataTableReturnInterface } from '../../../interfaces/dataTable.interface';
import { BaseService } from '../../../services/base.service';
import { CreateActivityDto, SendNotificationDto } from './activities.dto';
import { Activities } from './activities.model';
import { MessagingService } from '../../messaging/messaging.service';
import { Attendees } from '../attendees/attendees.model';

@Injectable()
export class ActivitiesService extends BaseService<Activities, CreateActivityDto> {
    constructor(@InjectModel("activities") private readonly activityModel: Model<Activities>,
                private readonly messagingService: MessagingService) {
        super(activityModel);
    }

    public async filterFrom(activitiesId: string[], filter: DataTableInterface): Promise<DataTableReturnInterface> {
        const condition = {
            $and: [{
                _id: { $in: activitiesId }
            }]
        };

        let query = this.activityModel.find(condition);
        let data: DataTableReturnInterface = <DataTableReturnInterface> {
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
            throw new BadRequestException("Attendee already subscribed");
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
            throw new BadRequestException("Attendee isn't subscribe");
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
        const activity = await this.findById(id, {
            model: "attendees",
            path: "subscribers"
        });

        if (!activity || !activity.subscribers.length) {
            return;
        }

        const tokens = activity.subscribers.map(x => x as Attendees)
            .map(x => x.messagingTokens)
            .reduce((a, b) => [...a, ...b]);

        await this.messagingService.send({
            notification: {
                ...message
            },
            data: {
                type: "activity",
                activity: id,
                dynamicLink: `activity/${id}`
            }
        }, tokens);
    }
}
