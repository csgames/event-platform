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
import { SchoolsService } from '../schools/schools.service';
import { AddTokenDto, CreateAttendeeDto, UpdateAttendeeDto, UpdateNotificationDto } from './attendees.dto';
import { codeMap } from './attendees.exception';
import { AttendeesGuard, CreateAttendeeGuard } from './attendees.guard';
import { Attendees } from './attendees.model';
import { AttendeesService } from './attendees.service';

@ApiUseTags('Attendee')
@Controller('attendee')
@UseGuards(PermissionsGuard)
@UseFilters(new CodeExceptionFilter(codeMap))
export class AttendeesController {
    constructor(private readonly attendeesService: AttendeesService,
                private readonly schoolService: SchoolsService,
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
        attendee = Object.assign(attendee, { userId: user.id, school: (await this.getSchool(value.school))._id });
        return {
            attendee: await this.attendeesService.create(attendee)
                .then(async a => {
                    return await a.populate({ path: 'school' }).execPopulate();
                }).then(this.appendCvMetadata.bind(this))
        };
    }

    @Get()
    @Permissions('event_management:get-all:attendee')
    public async getAll(): Promise<Attendees[]> {
        return await this.attendeesService.findAll();
    }

    @Get('info')
    public async getInfo(@User() user: UserModel): Promise<Attendees> {
        const attendee = await this.attendeesService.findOne({ email: user.username }, { path: 'school' });
        if (attendee) {
            return await this.appendCvMetadata(attendee);
        }
        return attendee;
    }

    @Get('cv/url')
    @UseGuards(AttendeesGuard)
    public async getCvUrl(@User() user: UserModel): Promise<{ url: string }> {
        const attendee = await this.attendeesService.findOne({ userId: user.id });
        if (attendee.cv) {
            return { url: await this.storageService.getDownloadUrl(attendee.cv) };
        } else {
            throw new BadRequestException('Attendee has no cv.');
        }
    }

    @Get(':id')
    @Permissions('event_management:get:attendee')
    public async getById(@Param('id') id: string): Promise<Attendees> {
        return await this.attendeesService.findOne({
            $or: [{
                publicId: id
            }, {
                userId: id
            }]
        });
    }

    @Put()
    @UseGuards(AttendeesGuard)
    public async update(@UploadedFile() file, @User() user: UserModel,
                        @Body(new ValidationPipe()) value: UpdateAttendeeDto) {
        if (file) {
            const previousCv = (await this.attendeesService.findOne({ userId: user.id })).cv;
            if (previousCv) {
                await this.storageService.delete(previousCv);
            }
            value.cv = await this.storageService.upload(file);
        } else if (value.cv === 'null') {
            const attendee = await this.attendeesService.findOne({ userId: user.id });
            if (attendee.cv) {
                await this.storageService.delete(attendee.cv);
            }
            value.cv = null;
        } else {
            delete value.cv;
        }
        const attendee: Partial<Attendees> = value;
        if (value.school) {
            attendee.school = (await this.getSchool(value.school))._id;
        }
        await this.attendeesService.update({
            userId: user.id
        }, attendee);
        await this.attendeesService.findOne({
            userId: user.id
        }, {
            path: 'school'
        });
    }

    @Put('token')
    @Permissions('event_management:update:attendee')
    @UseGuards(AttendeesGuard)
    public async addToken(@User() user: UserModel, @Body(ValidationPipe) dto: AddTokenDto) {
        await this.attendeesService.addToken(user.id, dto.token);
    }

    @Put('notification')
    @Permissions('event_management:update:attendee')
    @UseGuards(AttendeesGuard)
    public async updateNotification(@User() user: UserModel, @Body(ValidationPipe) dto: UpdateNotificationDto) {
        await this.attendeesService.updateNotification(user.id, dto);
    }

    @Delete('/token/:token')
    @Permissions('event_management:update:attendee')
    @UseGuards(AttendeesGuard)
    public async deleteToken(@User() user: UserModel, @Param('token') token) {
        await this.attendeesService.removeToken(user.id, token);
    }

    private async getSchool(name: string) {
        try {
            const school = await this.schoolService.findOne({name});
            if (school) {
                return school;
            }
        } catch (err) {
            throw new BadRequestException('School Invalid');
        }

        throw new BadRequestException('School Invalid');
    }

    private async appendCvMetadata(a: Attendees) {
        if (!a.cv) {
            return a;
        }
        const newAttendee = a.toObject();
        newAttendee['cv'] = await this.storageService.getMetadata(a.cv);
        return newAttendee;
    }
}
