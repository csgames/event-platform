import { Body, Controller, Get, Param, Post, Headers, UseFilters, UseGuards, Delete } from "@nestjs/common";
import { Permissions } from "../../../decorators/permission.decorator";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { CodeExceptionFilter } from "../../../filters/CodedError/code.filter";
import { NotificationsService } from "./notifications.service";
import { codeMap } from "./notifications.exception";
import { ApiUseTags } from "@nestjs/swagger";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { CreateNotificationsDto } from "./notifications.dto";

@ApiUseTags('Notification')
@Controller("notification")
@UseGuards(PermissionsGuard)
@UseFilters(new CodeExceptionFilter(codeMap))
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Post()
    @Permissions('event_management:create:notification')
    async create(@Body(new ValidationPipe()) notificationDto: CreateNotificationsDto) {
        await this.notificationsService.create({
            text: notificationDto.text,
            date: new Date(),
            attendees: []
        });
    }

    @Get()
    @Permissions('event_management:get-all:nitification')
    async getAll(@Headers('token-claim-user_id') userId: string, @Headers('token-claim-role') role: string) {
        return {
            notification: await this.notificationsService.getAll(userId, role)
        };
    }
}
