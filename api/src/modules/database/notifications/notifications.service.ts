import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as Nexmo from "nexmo";
import { interval, Subscription } from "rxjs";
import { BaseService } from "../../../services/base.service";
import { ConfigService } from "../../configs/config.service";
import { MessagingService } from "../../messaging/messaging.service";
import { AttendeesService } from "../attendees/attendees.service";
import { CreateNotificationsDto } from "./notifications.dto";
import { Notifications } from "./notifications.model";

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
                private readonly messagingService: MessagingService,
                private readonly attendeeService: AttendeesService,
                private readonly configService: ConfigService) {
        super(notificationModel);

        // @ts-ignore
        this.nexmo = new Nexmo({
            apiKey: configService.nexmo.apiKey,
            apiSecret: configService.nexmo.apiSecret
        }, {
            debug: configService.nexmo.debug
        });
    }

    public async create(dto: CreateNotificationsDto | Partial<Notifications>): Promise<Notifications> {
        const ids = (dto as CreateNotificationsDto).attendees;
        const attendees = await this.attendeeService.find({
            _id: {
                $in: ids
            }
        });

        if (attendees && !attendees.length) {
            return;
        }

        const tokens = attendees.map(x => x.messagingTokens).reduce((a, b) => [...a, ...b]);
        const notification = await super.create({
            ...dto,
            tokens,
            timestamp: new Date()
        });

        await this.messagingService.send({
            notification: {
                title: dto.title,
                body: dto.body
            },
            data: dto.data
        }, tokens);

        await this.attendeeService.updateMany({
            _id: {
                $in: ids
            }
        }, {
            $push: {
                notifications: {
                    notification: notification._id
                }
            }
        } as any);

        return notification;
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
            this.nexmo.message.sendSms(this.configService.nexmo.phoneNumber, sms.phone, sms.text, {},
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
