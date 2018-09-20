import { ApiUseTags } from '@nestjs/swagger';
import {
    Body, Controller, Get, Headers, Param, Post, UseGuards, Put, UseFilters, HttpCode, NotFoundException
} from "@nestjs/common";
import { TeamsService } from '../teams/teams.service';
import { EventsService } from "./events.service";
import { CreateEventDto, SendConfirmEmailDto } from "./events.dto";
import { Events } from "./events.model";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { Permissions } from "../../../decorators/permission.decorator";
import { CodeExceptionFilter } from "../../../filters/CodedError/code.filter";
import { codeMap } from "./events.exception";
import { AttendeesGuard } from "../attendees/attendees.guard";
import { AttendeesService } from "../attendees/attendees.service";
import { DataTablePipe } from "../../../pipes/dataTable.pipe";
import { DataTableInterface } from "../../../interfaces/dataTable.interface";

@ApiUseTags('Event')
@Controller('event')
@UseGuards(PermissionsGuard)
@UseFilters(new CodeExceptionFilter(codeMap))
export class EventsController {
    constructor(private attendeesService: AttendeesService,
                private eventsService: EventsService,
                private teamsService: TeamsService) {
    }

    @Post()
    @Permissions('event_management:create:event')
    async create(@Body(new ValidationPipe()) createEventDto: CreateEventDto) {
        await this.eventsService.create(createEventDto);
    }

    @Put(':id/attendee')
    @Permissions('event_management:add-attendee:event')
    async addAttendee(@Headers('token-claim-user_id') userId: string, @Param('id') eventId: string) {
        await this.eventsService.addAttendee(eventId, userId);
        return {};
    }

    @Post(':id/confirm')
    async confirm(@Headers('token-claim-user_id') userId: string,
                  @Param('id') eventId: string, @Body('attending') attending: boolean) {
        await this.eventsService.confirmAttendee(eventId, userId, attending);
    }

    @Put(':id/send_selection_email')
    @Permissions('event_management:send-selection-email:event')
    async sendSelectionEmail(@Body(new ValidationPipe()) sendConfirmEmailDto: SendConfirmEmailDto,
                             @Param('id') id: string) {
        return await this.eventsService.selectAttendees(id, sendConfirmEmailDto.userIds);
    }

    @Get(':id/status')
    @Permissions('event_management:get-status:event')
    async getAttendeeStatus(@Headers('token-claim-user_id') userId: string, @Param('id') eventId: string) {
        const attendee = await this.attendeesService.findOne({userId});

        if (!attendee) {
            return {
                status: 'not-registered'
            };
        }

        return {
            status: await this.eventsService.getAttendeeStatus(attendee._id, eventId)
        };
    }

    @Get()
    @Permissions('event_management:get-all:event')
    async getAll(): Promise<Events[]> {
        return await this.eventsService.findAll();
    }

    @Get(':id')
    @Permissions('event_management:get:event')
    async getByPublicId(@Param('id') id: string) {
        return {
            event: await this.eventsService.findOne({
                _id: id
            })
        };
    }

    @Get(':id/attendee')
    @UseGuards(AttendeesGuard)
    async hasAttendee(@Headers('token-claim-user_id') userId: string, @Param('id') eventId: string) {
        return {registered: await this.eventsService.hasAttendeeForUser(eventId, userId)};
    }

    @Post(':id/attendee/filter')
    @HttpCode(200)
    @Permissions('event_management:get-all:event')
    async eventAttendeeQuery(@Param('id') eventId: string, @Body(new DataTablePipe()) body: DataTableInterface) {
        return await this.eventsService.getFilteredAttendees(eventId, body);
    }

    @Get(':id/vegetarian')
    @HttpCode(200)
    @Permissions('event_management:get-vegetarian:event')
    async getVegetarianAttendees(@Param('id') eventId: string) {
        let event = await this.eventsService.findById(eventId);

        if (!event) {
            throw new NotFoundException(`Event ${eventId} not found.`);
        }

        let attendeeIds = event.attendees.filter(attendee => attendee.present).map(attendee => attendee.attendee);

        let attendees = await this.attendeesService.find({
            _id: {$in: attendeeIds},
            hasDietaryRestrictions: true,
            dietaryRestrictions: {$regex: /^v/i}
        });

        return {count: attendees.length};
    }

    @Put(':event_id/:attendee_id/present')
    @HttpCode(200)
    @Permissions('event_management:set-status:event')
    async setAttendeeStatus(@Param('event_id') eventId: string, @Param('attendee_id') attendeeId: string) {
        let event = await this.eventsService.findById(eventId);

        if (!event) {
            throw new NotFoundException(`Event ${eventId} not found.`);
        }

        let attendeeIndex = event.attendees.findIndex(attendee => attendee.attendee.toString() === attendeeId);

        event.attendees[attendeeIndex].present = true;

        await event.save();

        return event;
    }

    @Post(':id/team/filter')
    @HttpCode(200)
    @Permissions('event_management:get-all:event')
    async eventTeamQuery(@Param('id') eventId: string, @Body(new DataTablePipe()) body: DataTableInterface) {
        return await this.teamsService.getFilteredTeam(eventId, body);
    }

    @Post(':id/activity/filter')
    @HttpCode(200)
    @Permissions('event_management:get-all:event')
    async eventActivityQuery(@Param('id') eventId: string, @Body(new DataTablePipe()) body: DataTableInterface) {
        return await this.eventsService.getFilteredActivities(eventId, body);
    }
}
