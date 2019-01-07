import { Body, Controller, Get, Post, Headers, UseFilters, UseGuards } from "@nestjs/common";
import { Permissions } from "../../../decorators/permission.decorator";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { CodeExceptionFilter } from "../../../filters/CodedError/code.filter";
import { NotificationsService } from "./notifications.service";
import { codeMap } from "./notifications.exception";
import { ApiUseTags } from "@nestjs/swagger";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { CreateNotificationsDto, SmsDto } from "./notifications.dto";
import { AttendeesService } from "../attendees/attendees.service";

@ApiUseTags('Notification')
@Controller("notification")
@UseGuards(PermissionsGuard)
@UseFilters(new CodeExceptionFilter(codeMap))
export class NotificationsController {
    constructor(private notificationsService: NotificationsService,
                private attendeesService: AttendeesService) {}

    @Post()
    @Permissions('event_management:create:notification')
    async create(@Body(new ValidationPipe()) notificationDto: CreateNotificationsDto) {
        await this.notificationsService.create({
            ...notificationDto,
            timestamp: new Date()
        });
    }

    @Get()
    @Permissions('event_management:get-all:notification')
    async getAll() {
        return {
            notification: await this.notificationsService.findAll()
        };
    }

    @Post('sms')
    @Permissions('event_management:sms:notification')
    async sms(@Body(new ValidationPipe()) smsDto: SmsDto) {
        let attendees = await this.attendeesService.find({
            publicId: { $in: smsDto.publicIds },
            acceptSMSNotifications: true,
        });

        let phoneNumbers: string[] = attendees
            .map(attendee => { return attendee.phoneNumber; })
            .filter(number => /^\+?[1-9]\d{10,14}$/g.test(number));

        this.notificationsService.sendSms(phoneNumbers, smsDto.text);

        return { message: "sms queued"};
    }
}
