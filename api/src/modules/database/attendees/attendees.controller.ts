import { Request } from 'express';
import {
    Body, Controller, Get, Headers, HttpStatus, Param, Post, Put, Req, UseFilters,
    UseGuards
} from '@nestjs/common';
import { StorageService } from '@polyhx/nest-services';
import { AttendeesService } from './attendees.service';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { PermissionsGuard } from '../../../guards/permission.guard';
import { Permissions } from '../../../decorators/permission.decorator';
import { HttpException } from '@nestjs/core';
import { SchoolsService } from '../schools/schools.service';
import { CreateAttendeeDto, UpdateAttendeeDto } from './attendees.dto';
import { Attendees } from './attendees.model';
import { Schools } from '../schools/schools.model';
import { AttendeesGuard, CreateAttendeeGuard } from './attendees.guard';
import { CodeExceptionFilter } from '../../../filters/CodedError/code.filter';
import { codeMap } from './attendees.exception';
import { ApiUseTags } from '@nestjs/swagger';
import { EventsService } from "../events/events.service";

@ApiUseTags('Attendee')
@Controller('attendee')
@UseGuards(PermissionsGuard)
@UseFilters(new CodeExceptionFilter(codeMap))
export class AttendeesController {
    constructor(private readonly attendeesService: AttendeesService,
                private readonly schoolService: SchoolsService,
                private readonly storageService: StorageService) {
    }

    private async getSchool(name: string) {
        let school: Schools;
        try {
            school = await this.schoolService.findOne({name});
        } catch (err) {
            throw new HttpException('School Invalid', HttpStatus.BAD_REQUEST);
        }

        if (!school) {
            throw new HttpException('School Invalid', HttpStatus.BAD_REQUEST);
        }

        return school;
    }

    private async appendCvMetadata(a: Attendees) {
        if (!a.cv) {
            return a;
        }
        let newAttendee = a.toObject();
        newAttendee['cv'] = await this.storageService.getMetadata(a.cv);
        return newAttendee;
    }

    @Post()
    @UseGuards(CreateAttendeeGuard)
    async create(@Req() req: Request, @Headers('token-claim-user_id') userId: string,
                 @Body(new ValidationPipe()) value: CreateAttendeeDto) {
        if (req.file) {
            value.cv = await this.storageService.upload(req.file);
        }
        let attendee: Partial<Attendees> = value;
        attendee = Object.assign(attendee, {userId, school: (await this.getSchool(value.school))._id});
        return {
            attendee: await this.attendeesService.create(attendee)
                .then(async a => {
                    return await a.populate({path: 'school'}).execPopulate();
                }).then(this.appendCvMetadata.bind(this))
        };
    }

    @Get()
    @Permissions('event_management:get-all:attendee')
    async getAll() {
        return {attendees: await this.attendeesService.findAll()};
    }

    @Get('info')
    @UseGuards(AttendeesGuard)
    async getInfo(@Headers('token-claim-user_id') userId: string) {
        let attendee = await this.attendeesService.findOne({userId}, {path: 'school'});
        if (attendee) {
            return {attendee: await this.appendCvMetadata(attendee)};
        }
        return {
            attendee: attendee
        };
    }

    @Get('cv/url')
    @UseGuards(AttendeesGuard)
    async getCvUrl(@Headers('token-claim-user_id') userId: string) {
        let attendee = await this.attendeesService.findOne({userId});
        if (attendee.cv) {
            return {url: await this.storageService.getDownloadUrl(attendee.cv)};
        } else {
            throw new HttpException('Attendee has no cv.', HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id')
    @Permissions('event_management:get:attendee')
    async getByPublicId(@Param('id') id: string) {
        return {
            attendee: await this.attendeesService.findOne({
                publicId: id
            })
        };
    }

    @Get('user/:userId')
    @Permissions('event_management:get:attendee')
    async getByUserId(@Param('userId') userId: string) {
        return {
            attendee: await this.attendeesService.findOne({
                userId: userId
            })
        };
    }

    @Put()
    @UseGuards(AttendeesGuard)
    async update(@Req() req: Request, @Headers('token-claim-user_id') userId: string,
                 @Body(new ValidationPipe()) value: UpdateAttendeeDto) {
        if (req.file) {
            let previousCv = (await this.attendeesService.findOne({userId})).cv;
            if (previousCv) {
                await this.storageService.delete(previousCv);
            }
            value.cv = await this.storageService.upload(req.file);
        } else if (value.cv === 'null') {
            await this.storageService.delete((await this.attendeesService.findOne({userId})).cv);
            value.cv = null;
        } else {
            delete value.cv;
        }
        let attendee: Partial<Attendees> = value;
        if (value.school) {
            attendee.school = (await this.getSchool(value.school))._id;
        }
        return {
            attendee: await this.attendeesService.update({userId}, attendee)
                .then(async a => {
                    return await this.attendeesService.findOne({userId}, {path: 'school'});
                }).then(this.appendCvMetadata.bind(this))
        };
    }

    @Put(':attendee_id/public_id/:public_id')
    @Permissions('event_management:set-public-id:attendee')
    async setPublicId(@Param('attendee_id') attendeeId: string, @Param('public_id') publicId: string) {
        let attendee: Attendees = await this.attendeesService.findById(attendeeId);

        if (!attendee) {
            throw new HttpException(`Attendee ${attendeeId} not found.`, HttpStatus.NOT_FOUND);
        }

        attendee.publicId = publicId;

        await attendee.save();

        return attendee;
    }
}
