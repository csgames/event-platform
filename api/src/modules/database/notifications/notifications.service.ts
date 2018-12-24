import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as Nexmo from "nexmo";
import { BaseService } from "../../../services/base.service";
import { AttendeesService } from "../attendees/attendees.service";
import { CreateNotificationsDto } from "./notifications.dto";
import { NotificationGateway } from "./notifications.gateway";
import { Notifications } from "./notifications.model";
import { interval, Subscription } from 'rxjs';

// TODO: Add Notification_size field in event and use that to check Notification size when joining.
const MAX_Notification_SIZE = 4;

interface LeaveNotificationResponse {
    deleted: boolean;
    Notification: Notifications;
}

@Injectable()
export class NotificationsService extends BaseService<Notifications, CreateNotificationsDto> {
    private nexmo: any;
    private sms: { text: string; phone: string }[] = [];
    private smsSubscription: Subscription;

    constructor(@InjectModel("notifications") private readonly notificationModel: Model<Notifications>,
                private readonly attendeeService: AttendeesService,
                private readonly gateway: NotificationGateway) {
        super(notificationModel);

        this.nexmo = new Nexmo({
            apiKey: process.env.NEXMO_API_KEY,
            apiSecret: process.env.NEXMO_API_SECRET,
            options: {
                debug: process.env.NEXMO_DEBUG
            }
        });
    }

    async create(dto: Partial<Notifications>) {
        let notification = await super.create(dto);

        this.gateway.sendNotification(dto);

        return notification;
    }

    async getAll(userId: string, role) {
        if (role === 'attendee') {
            let attendee = await this.attendeeService.findOne({ userId: userId });
            let notifications = await this.find({
                attendees: {
                    $nin: [ attendee._id ]
                }
            });

            for (let notif of notifications) {
                await this.notificationModel.update({
                    _id: notif._id
                }, {
                    $push: {
                        attendees: attendee._id
                    }
                });
            }

            return notifications.map(value => {
                return {
                    text: value.text,
                    date: value.date
                };
            });
        }

        return this.findAll();
    }

    // Send an sms to number (Use E.164 format)
    public sendSms(numbers: string[], text: string) {
        numbers = numbers.filter(number => /^\+?[1-9]\d{10,14}$/g.test(number));
        this.sms.push(...numbers.map(x => {
            return {
                text,
                phone: x
            };
        }));

        if (this.smsSubscription) {
            return;
        }

        this.smsSubscription = interval(1100)
            .subscribe(() => {
                const sms = this.sms.pop();
                if (!sms) {
                    this.smsSubscription.unsubscribe();
                    this.smsSubscription = null;
                    return;
                }

                this.sendOneSms(sms);
            });
    }

    private sendOneSms(sms: { text: string, phone: string }) {
        try {
            this.nexmo.message.sendSms(process.env.NEXMO_FROM_NUMBER, sms.phone, sms.text, {},
                (err, apiResponse) => {
                    if (err) {
                        console.log("Nexmo failed to send sms. Reason:\n" + err);
                    } else if (apiResponse.messages[0].status !== "0") {
                        console.log(apiResponse);
                    }
                });
        } catch (err) {
            console.log("Nexmo failed to send sms. Reason:\n" + err);
        }
    }
}
