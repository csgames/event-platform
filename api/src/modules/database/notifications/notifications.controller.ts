import { Body, Controller, Get, Post, UseFilters, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Permissions } from '../../../decorators/permission.decorator';
import { CodeExceptionFilter } from '../../../filters/code-error/code.filter';
import { PermissionsGuard } from '../../../guards/permission.guard';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { AttendeesService } from '../attendees/attendees.service';
import { CreateNotificationsDto, SmsDto } from './notifications.dto';
import { codeMap } from './notifications.exception';
import { Notifications } from './notifications.model';
import { NotificationsService } from './notifications.service';

@ApiUseTags('Notification')
@Controller("notification")
@UseGuards(PermissionsGuard)
@UseFilters(new CodeExceptionFilter(codeMap))
export class NotificationsController {
    constructor(private notificationsService: NotificationsService,
                private attendeesService: AttendeesService) {}

    @Post()
    @Permissions('csgames-api:create:notification')
    public async create(@Body(new ValidationPipe()) notificationDto: CreateNotificationsDto) {
        await this.notificationsService.create({
            ...notificationDto,
            timestamp: new Date()
        });
    }

    @Get()
    @Permissions('csgames-api:get-all:notification')
    public async getAll(): Promise<{ notification: Notifications[] }> {
        return {
            notification: await this.notificationsService.findAll()
        };
    }

    @Post('sms')
    @Permissions('csgames-api:sms:notification')
    public async sms(@Body(new ValidationPipe()) smsDto: SmsDto): Promise<{ message: string }> {
        const attendees = await this.attendeesService.find({
            publicId: { $in: smsDto.publicIds },
            acceptSMSNotifications: true,
        });

        const phoneNumbers: string[] = attendees
            .map(attendee => { return attendee.phoneNumber; })
            .filter(number => /^\+?[1-9]\d{10,14}$/g.test(number));

        this.notificationsService.sendSms(phoneNumbers, smsDto.text);

        return { message: "sms queued"};
    }
}
