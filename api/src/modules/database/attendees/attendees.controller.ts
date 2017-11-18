import { Body, Controller, Get, Headers, HttpStatus, Param, Post, Put, UseFilters, UseGuards } from "@nestjs/common";
import { AttendeesService } from "./attendees.service";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { Permissions } from "../../../decorators/permission.decorator";
import { HttpException } from "@nestjs/core";
import { SchoolsService } from "../schools/schools.service";
import { CreateAttendeeDto, UpdateAttendeeDto } from "./attendees.dto";
import { Attendees } from "./attendees.model";
import { Schools } from "../schools/schools.model";
import { AttendeesGuard, CreateAttendeeGuard } from "./attendees.guard";
import { CodeExceptionFilter } from "../../../filters/CodedError/code.filter";
import { codeMap } from "./attendees.exception";

@Controller("attendee")
@UseGuards(PermissionsGuard)
@UseFilters(new CodeExceptionFilter(codeMap))
export class AttendeesController {
    constructor(private readonly attendeesService: AttendeesService,
                private readonly schoolService: SchoolsService) { }

    private async getSchool(name: string) {
        let school: Schools;
        try {
            school = await this.schoolService.findOne({ name });
        } catch (err) {
            throw new HttpException("School Invalid", HttpStatus.BAD_REQUEST);
        }

        if (!school) {
            throw new HttpException("School Invalid", HttpStatus.BAD_REQUEST);
        }

        return school;
    }

    @Post()
    @UseGuards(CreateAttendeeGuard)
    async create(@Headers('token-claim-user_id') userId: string, @Body(new ValidationPipe()) value: CreateAttendeeDto) {
        let attendee: Partial<Attendees> = Object.assign({}, value);
        attendee = Object.assign(attendee, { userId, school: (await this.getSchool(value.school))._id });
        return {
            attendee: await this.attendeesService.create(attendee)
                .then(async a => {
                    return await a.populate({ path: 'school' }).execPopulate();
                })
        };
    }

    @Get()
    @Permissions('event_management:get-all:attendee')
    async getAll() {
        return { attendees: await this.attendeesService.findAll() };
    }

    @Get('info')
    @UseGuards(AttendeesGuard)
    async getInfo(@Headers('token-claim-user_id') user: string) {
        return {
            attendee: await this.attendeesService.findOne({
                userId: user
            }, { path: 'school' })
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

    @Put()
    @UseGuards(AttendeesGuard)
    async update(@Headers('token-claim-user_id') userId: string, @Body(new ValidationPipe()) value: UpdateAttendeeDto) {
        let attendee: Partial<Attendees> = Object.assign({}, value);
        attendee = Object.assign(attendee, { school: (await this.getSchool(value.school))._id });
        return {
            attendee: await this.attendeesService.update({ userId }, attendee)
                .then(async a => {
                    return await this.attendeesService.findOne({ userId }, { path: 'school' });
                })
        };
    }
}
