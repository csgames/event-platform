import {
    Body, Controller, Get, Headers, HttpCode, NotFoundException, Param, Post, Put, UseFilters, UseGuards
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Permissions } from '../../../decorators/permission.decorator';
import { CodeExceptionFilter } from '../../../filters/CodedError/code.filter';
import { PermissionsGuard } from '../../../guards/permission.guard';
import { DataTableInterface } from '../../../interfaces/dataTable.interface';
import { DataTablePipe } from '../../../pipes/dataTable.pipe';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { CreateActivityDto } from '../activities/activities.dto';
import { AttendeesGuard } from '../attendees/attendees.guard';
import { AttendeesService } from '../attendees/attendees.service';
import { TeamsService } from '../teams/teams.service';
import { AddSponsorDto, CreateEventDto, SendConfirmEmailDto, UpdateEventDto } from './events.dto';
import { codeMap } from './events.exception';
import { Events } from './events.model';
import { EventsService } from './events.service';

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

    @Put(':id/send_selection_email/filter')
    @Permissions('event_management:send-selection-email:event')
    async sendSelectionEmailFromFilter(@Param('id') id: string, @Body(new DataTablePipe()) body: DataTableInterface,
                                       @Body('filter') filter) {
        const attendees = await this.eventsService.getFilteredAttendees(id, body, JSON.parse(filter));
        const userIds = attendees.data.map(x => x.userId);
        return await this.eventsService.selectAttendees(id, userIds);
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
    @Permissions('event_management:get-all:attendee')
    async eventAttendeeQuery(@Param('id') eventId: string, @Body(new DataTablePipe()) body: DataTableInterface,
                             @Body('filter') filter) {
        return await this.eventsService.getFilteredAttendees(eventId, body, JSON.parse(filter));
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
        const event = await this.eventsService.findById(eventId);

        if (!event) {
            throw new NotFoundException(`Event ${eventId} not found.`);
        }

        const attendeeIndex = event.attendees.findIndex(attendee => attendee.attendee.toString() === attendeeId);

        event.attendees[attendeeIndex].present = true;
        await this.teamsService.setTeamToPresent(eventId, attendeeId);

        await event.save();

        return event;
    }

    @Put(':id')
    @Permissions('event_management:update:event')
    async update(@Param('id') id: string, @Body(new ValidationPipe()) event: UpdateEventDto) {
        await this.eventsService.update({
            _id: id
        }, event);

        return;
    }

    @Put(':id/activity')
    @Permissions('event_management:update:event')
    async addActivity(@Param('id') id: string, @Body(new ValidationPipe()) activity: CreateActivityDto) {
        await this.eventsService.createActivity(id, activity);
    }

    @Get(':id/team')
    @Permissions('event_management:get-all:team')
    async eventTeamQuery(@Param('id') eventId: string) {
        return await this.teamsService.getTeamFromEvent(eventId);
    }

    @Post(':id/activity/filter')
    @HttpCode(200)
    @Permissions('event_management:get-all:activity')
    async eventActivityQuery(@Param('id') eventId: string, @Body(new DataTablePipe()) body: DataTableInterface) {
        return await this.eventsService.getFilteredActivities(eventId, body);
    }

    @Get(':id/activity')
    @Permissions('event_management:get-all:activity')
    async getActivity(@Param('id') eventId: string) {
        return await this.eventsService.getActivities(eventId);
    }

    @Get(':id/stats')
    @Permissions('event_management:get-stats:event')
    getStats(@Param('id') eventId: string) {
        return this.eventsService.getStats(eventId);
    }

    @Get(':id/sponsor')
    @Permissions('event_management:get-all:sponsor')
    async getSponsor(@Param('id') eventId: string) {
        return await this.eventsService.getSponsors(eventId);
    }

    @Put(':id/sponsor')
    @Permissions('event_management:update:event')
    async addSponsor(@Param('id') eventId: string, @Body(new ValidationPipe()) dto: AddSponsorDto) {
        return await this.eventsService.addSponsor(eventId, dto);
    }
}
