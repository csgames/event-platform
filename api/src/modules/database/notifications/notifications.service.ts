import { Component, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { BaseService } from "../../../services/base.service";
import { CreateNotificationsDto } from "./notifications.dto";
import { Notifications } from "./notifications.model";
import { AttendeesService } from "../attendees/attendees.service";

// TODO: Add Notification_size field in event and use that to check Notification size when joining.
const MAX_Notification_SIZE = 4;

interface LeaveNotificationResponse {
    deleted: boolean;
    Notification: Notifications;
}

@Component()
export class NotificationsService extends BaseService<Notifications, CreateNotificationsDto> {
    constructor(@Inject("NotificationsModelToken") private readonly notificationModel: Model<Notifications>,
                private readonly attendeeService: AttendeesService) {
        super(notificationModel);
    }

    async getAll(userId: string, role) {
        if (role === 'attendee') {
            let attendee = await this.attendeeService.findOne({ userId: userId });
            let notifications = await this.find({
                attendees: {
                    $nin: [ attendee._id ]
                }
            });

            return notifications.map(value => {
                return {
                    text: value.text,
                    date: value.date
                };
            });
        }

        return this.findAll();
    }
}
