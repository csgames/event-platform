import {
    BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseFilters, UseGuards
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { StorageService } from '@polyhx/nest-services';
import { Permissions } from '../../../decorators/permission.decorator';
import { User } from '../../../decorators/user.decorator';
import { CodeExceptionFilter } from '../../../filters/code-error/code.filter';
import { PermissionsGuard } from '../../../guards/permission.guard';
import { UserModel } from '../../../models/user.model';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { AddTokenDto, CreateAttendeeDto, UpdateAttendeeDto, UpdateNotificationDto } from './attendees.dto';
import { codeMap } from './attendees.exception';
import { CreateAttendeeGuard } from './attendees.guard';
import { Attendees } from './attendees.model';
import { AttendeeInfo, AttendeesService } from './attendees.service';
import { EventId } from '../../../decorators/event-id.decorator';
import { NullPipe } from '../../../pipes/null-pipe.service';

@ApiUseTags('Attendee')
@Controller('attendee')
@UseGuards(PermissionsGuard)
@UseFilters(new CodeExceptionFilter(codeMap))
export class AttendeesController {
    constructor(private readonly attendeesService: AttendeesService,
                private readonly storageService: StorageService) {
    }

    @Post()
    @UseGuards(CreateAttendeeGuard)
    public async create(@UploadedFile() file, @User() user: UserModel,
                        @Body(new ValidationPipe()) value: CreateAttendeeDto): Promise<{ attendee: Attendees }> {
        if (file) {
            value.cv = await this.storageService.upload(file);
        }
        let attendee: Partial<Attendees> = value;
        attendee = Object.assign(attendee, { userId: user.id });
        return {
            attendee: await this.attendeesService.create(attendee)
        };
    }

    @Get()
    @Permissions('csgames-api:get-all:attendee')
    public async getAll(): Promise<Attendees[]> {
        return await this.attendeesService.findAll();
    }

    @Get('info')
    public async getInfo(@User() user: UserModel, @EventId() event: string): Promise<AttendeeInfo> {
        return await this.attendeesService.getAttendeeInfo(user, event);
    }

    @Get('cv/url')
    @Permissions('csgames-api:get:attendee')
    public async getCvUrl(@User() user: UserModel): Promise<{ url: string }> {
        const attendee = await this.attendeesService.findOne({ email: user.username });
        if (attendee.cv) {
            return { url: await this.storageService.getDownloadUrl(attendee.cv) };
        } else {
            throw new BadRequestException('Attendee has no cv.');
        }
    }

    @Get(':id')
    @Permissions('csgames-api:get:attendee')
    public async getById(@Param('id') id: string): Promise<Attendees> {
        return await this.attendeesService.findOne({
            $or: [{
                publicId: id
            }, {
                userId: id
            }, {
                email: id
            }]
        });
    }

    @Put()
    @Permissions('csgames-api:update:attendee')
    public async update(@UploadedFile() file, @User() user: UserModel,
                        @Body(NullPipe, ValidationPipe) value: UpdateAttendeeDto) {
        await this.attendeesService.updateAttendeeInfo({
            email: user.username
        }, value, file);
    }

    @Put('token')
    public async addToken(@User() user: UserModel, @Body(ValidationPipe) dto: AddTokenDto) {
        await this.attendeesService.addToken(user.username, dto.token);
    }

    @Put('notification')
    @Permissions('csgames-api:update:attendee')
    public async updateNotification(@User() user: UserModel, @Body(ValidationPipe) dto: UpdateNotificationDto) {
        await this.attendeesService.updateNotification(user.username, dto);
    }

    @Delete('/token/:token')
    public async deleteToken(@User() user: UserModel, @Param('token') token) {
        await this.attendeesService.removeToken(user.username, token);
    }
}
