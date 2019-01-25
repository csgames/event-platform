import { Body, Controller, Get, HttpCode, Param, Post, Put, Query, UseFilters, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Permissions } from '../../../decorators/permission.decorator';
import { User } from '../../../decorators/user.decorator';
import { CodeExceptionFilter } from '../../../filters/code-error/code.filter';
import { PermissionsGuard } from '../../../guards/permission.guard';
import { DataTableModel, DataTableReturnModel } from '../../../models/data-table.model';
import { UserModel } from '../../../models/user.model';
import { DataTablePipe } from '../../../pipes/data-table.pipe';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { CreateActivityDto } from '../activities/activities.dto';
import { Activities } from '../activities/activities.model';
import { AttendeesGuard } from '../attendees/attendees.guard';
import { AttendeeNotifications } from '../attendees/attendees.model';
import { AttendeesService } from '../attendees/attendees.service';
import { Teams } from '../teams/teams.model';
import { TeamsService } from '../teams/teams.service';
import {
    AddScannedAttendee, AddSponsorDto, CreateEventDto, SendConfirmEmailDto, SendNotificationDto, SendSmsDto, UpdateEventDto
} from './events.dto';
import { codeMap, EventNotFoundException } from './events.exception';
import { Events, EventSponsorDetails } from './events.model';
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
    @Permissions('csgames-api:create:event')
    public async create(@Body(new ValidationPipe()) createEventDto: CreateEventDto) {
        await this.eventsService.create(createEventDto);
    }

    @Put(':id/attendee')
    @Permissions('csgames-api:add-attendee:event')
    public async addAttendee(@User() user: UserModel, @Param('id') eventId: string) {
        await this.eventsService.addAttendee(eventId, user.id, 'attendee');
    }

    @Post(':id/confirm')
    public async confirm(@User() user: UserModel, @Param('id') eventId: string, @Body('attending') attending: boolean) {
        await this.eventsService.confirmAttendee(eventId, user.id, attending);
    }

    @Put(':id/send_selection_email')
    @Permissions('csgames-api:send-selection-email:event')
    public async sendSelectionEmail(@Body(new ValidationPipe()) sendConfirmEmailDto: SendConfirmEmailDto, @Param('id') id: string) {
        await this.eventsService.selectAttendees(id, sendConfirmEmailDto.userIds);
    }

    @Put(':id/send_selection_email/filter')
    @Permissions('csgames-api:send-selection-email:event')
    public async sendSelectionEmailFromFilter(@Param('id') id: string, @Body(new DataTablePipe()) body: DataTableModel,
            @Body('filter') filter) {
        const attendees = await this.eventsService.getFilteredAttendees(id, body, JSON.parse(filter));
        const userIds = attendees.data.map(x => x.userId);
        await this.eventsService.selectAttendees(id, userIds);
    }

    @Get(':id/status')
    @Permissions('csgames-api:get-status:event')
    public async getAttendeeStatus(@User() user: UserModel, @Param('id') eventId: string): Promise<string> {
        const attendee = await this.attendeesService.findOne({
            userId: user.id
        });

        if (!attendee) {
            return 'not-registered';
        }

        return await this.eventsService.getAttendeeStatus(attendee._id, eventId);
    }

    @Get()
    @Permissions('csgames-api:get-all:event')
    public async getAll(): Promise<Events[]> {
        return await this.eventsService.findAll();
    }

    @Get(':id')
    @Permissions('csgames-api:get:event')
    public async getByPublicId(@Param('id') id: string): Promise<Events> {
        return await this.eventsService.findOne({
            _id: id
        });
    }

    @Get(':id/attendee')
    @UseGuards(AttendeesGuard)
    public async hasAttendee(@User() user: UserModel, @Param('id') eventId: string): Promise<{ registered: boolean }> {
        return {
            registered: await this.eventsService.hasAttendeeForUser(eventId, user.id)
        };
    }

    @Post(':id/attendee/filter')
    @HttpCode(200)
    @Permissions('csgames-api:get-all:attendee')
    public async eventAttendeeQuery(@Param('id') eventId: string, @Body(new DataTablePipe()) body: DataTableModel,
                                    @Body('filter') filter): Promise<DataTableReturnModel> {
        return await this.eventsService.getFilteredAttendees(eventId, body, JSON.parse(filter));
    }

    @Get(':id/vegetarian')
    @HttpCode(200)
    @Permissions('csgames-api:get-vegetarian:event')
    public async getVegetarianAttendees(@Param('id') eventId: string): Promise<number> {
        const event = await this.eventsService.findById(eventId);

        if (!event) {
            throw new EventNotFoundException();
        }

        const attendeeIds = event.attendees.filter(attendee => attendee.present).map(attendee => attendee.attendee);

        const attendees = await this.attendeesService.find({
            _id: {
                $in: attendeeIds
            },
            hasDietaryRestrictions: true,
            dietaryRestrictions: {$regex: /^v/i}
        });

        return attendees.length;
    }

    @Put(':event_id/:attendee_id/present')
    @HttpCode(200)
    @Permissions('csgames-api:set-status:event')
    public async setAttendeeStatus(@Param('event_id') eventId: string, @Param('attendee_id') attendeeId: string): Promise<Events> {
        const event = await this.eventsService.findById(eventId);

        if (!event) {
            throw new EventNotFoundException();
        }

        const attendeeIndex = event.attendees.findIndex(attendee => attendee.attendee.toString() === attendeeId);

        event.attendees[attendeeIndex].present = true;
        await this.teamsService.setTeamToPresent(eventId, attendeeId);

        await event.save();

        return event;
    }

    @Put(':id')
    @Permissions('csgames-api:update:event')
    public async update(@Param('id') id: string, @Body(new ValidationPipe()) event: UpdateEventDto) {
        await this.eventsService.update({
            _id: id
        }, event);
    }

    @Put(':id/activity')
    @Permissions('csgames-api:update:event')
    public async addActivity(@Param('id') id: string, @Body(new ValidationPipe()) activity: CreateActivityDto) {
        await this.eventsService.createActivity(id, activity);
    }

    @Get(':id/team')
    @Permissions('csgames-api:get-all:team')
    public async eventTeamQuery(@Param('id') eventId: string): Promise<Teams[]> {
        return await this.teamsService.getTeamFromEvent(eventId);
    }

    @Post(':id/activity/filter')
    @HttpCode(200)
    @Permissions('csgames-api:get-all:activity')
    public async eventActivityQuery(@Param('id') eventId: string,
                                    @Body(new DataTablePipe()) body: DataTableModel): Promise<DataTableReturnModel> {
        return await this.eventsService.getFilteredActivities(eventId, body);
    }

    @Get(':id/activity')
    @Permissions('csgames-api:get-all:activity')
    public async getActivity(@Param('id') eventId: string): Promise<Activities[]> {
        return await this.eventsService.getActivities(eventId);
    }

    @Get(':id/stats')
    @Permissions('csgames-api:get-stats:event')
    public async getStats(@Param('id') eventId: string): Promise<object> {
        return this.eventsService.getStats(eventId);
    }

    @Post(':id/sponsor/filter')
    @HttpCode(200)
    @Permissions('csgames-api:get-all:sponsor')
    public async eventSponsorQuery(@Param('id') eventId: string,
                                   @Body(new DataTablePipe()) body: DataTableModel): Promise<DataTableReturnModel> {
        return await this.eventsService.getFilteredSponsors(eventId, body);
    }

    @Get(':id/sponsor')
    @Permissions('csgames-api:get-all:sponsor')
    public async getSponsor(@Param('id') eventId: string): Promise<{ [tier: string]: EventSponsorDetails[] }> {
        return await this.eventsService.getSponsors(eventId);
    }

    @Get(':id/notification')
    @Permissions('csgames-api:get:notification')
    public async getNotifications(@Param('id') id: string, @User() user: UserModel,
                                  @Query('seen') seen: boolean): Promise<AttendeeNotifications[]> {
        return await this.eventsService.getNotifications(id, user.id, seen);
    }

    @Put(':id/sponsor')
    @Permissions('csgames-api:update:event')
    public async addSponsor(@Param('id') eventId: string, @Body(new ValidationPipe()) dto: AddSponsorDto): Promise<Events> {
        return await this.eventsService.addSponsor(eventId, dto);
    }

    @Put(':event_id/:attendee_id/scan')
    @Permissions('csgames-api:set-status:event')
    public async addScannedAttendee(@Param('event_id') eventId: string, @Param('attendee_id') attendeeId: string,
                                    @Body(new ValidationPipe()) body: AddScannedAttendee) {
        await this.eventsService.addScannedAttendee(eventId, attendeeId, body);
    }

    @Post(':id/notification')
    @Permissions('csgames-api:update:event')
    public async createNotification(@Param('id') id: string, @Body(ValidationPipe) dto: SendNotificationDto) {
        await this.eventsService.createNotification(id, dto);
    }

    @Post(':id/sms')
    @Permissions('csgames-api:update:event')
    public async sendSms(@Param('id') id: string, @Body(ValidationPipe) dto: SendSmsDto) {
        await this.eventsService.sendSms(id, dto.text);
    }
}
