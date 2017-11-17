import { Body, Controller, Get, Headers, HttpStatus, Param, Post, Req, UseGuards, UsePipes } from "@nestjs/common";
import { AttendeesService } from "./attendees.service";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { Permissions } from "../../../decorators/permission.decorator";
import { HttpException } from "@nestjs/core";
import { SchoolsService } from "../schools/schools.service";
import { CreateAttendeeDto } from "./attendees.dto";
import { Attendees } from "./attendees.model";
import { Schools } from "../schools/schools.model";
import { EventsService } from "../events/events.service";

@Controller("attendee")
@UseGuards(PermissionsGuard)
export class AttendeesController {
    constructor(private readonly attendeesService: AttendeesService,
                private readonly schoolService: SchoolsService) { }

    @Post()
    async create(@Headers('token-claim-user_id') userId: string, @Body(new ValidationPipe()) value: CreateAttendeeDto) {
        let school: Schools;
        try {
            school = await this.schoolService.findOne({ name: value.school });
        } catch (err) {
            throw new HttpException("School Invalid", HttpStatus.BAD_REQUEST);
        }

        if (!school) {
            throw new HttpException("School Invalid", HttpStatus.BAD_REQUEST);
        }

        let attendee: Partial<Attendees> = {
            userId: userId,
            github: value.github,
            linkedIn: value.linkedIn,
            website: value.website,
            gender: value.gender,
            tshirt: value.tshirt,
            school: school._id
        };

        return { attendee: await this.attendeesService.create(attendee) };
    }

    @Get()
    @Permissions('event_management:get-all:attendee')
    async getAll() {
        return { attendees: await this.attendeesService.findAll() };
    }

    @Get('info')
    async getInfo(@Headers('token-claim-role') role: string, @Headers('token-claim-user_id') user: string) {
        if (role !== 'attendee') {
            throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
        }

        return {
            attendee: await this.attendeesService.findOne({
                userId: user
            })
        };
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
}
