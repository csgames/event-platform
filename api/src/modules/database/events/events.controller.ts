import { Body, Controller, Get, HttpCode, Param, Post, Put, Query, UploadedFile, UseFilters, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Permissions } from '../../../decorators/permission.decorator';
import { User } from '../../../decorators/user.decorator';
import { CodeExceptionFilter } from '../../../filters/code-error/code.filter';
import { PermissionsGuard } from '../../../guards/permission.guard';
import { UserModel } from '../../../models/user.model';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { CreateActivityDto } from '../activities/activities.dto';
import { Activities } from '../activities/activities.model';
import { AttendeeNotifications } from '../attendees/attendees.model';
import { AttendeesService } from '../attendees/attendees.service';
import { Teams } from '../teams/teams.model';
import { TeamsService } from '../teams/teams.service';
import { AddScannedAttendee, AddSponsorDto, CreateEventDto, SendNotificationDto, SendSmsDto, UpdateEventDto } from './events.dto';
import { codeMap, EventNotFoundException } from './events.exception';
import { Events, EventSponsorDetails } from './events.model';
import { EventsService } from './events.service';
import { UpdateAttendeeDto } from '../attendees/attendees.dto';
import { EventId } from '../../../decorators/event-id.decorator';
import { NullPipe } from '../../../pipes/null-pipe.service';

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

    @Get()
    public async getAll(): Promise<Events[]> {
        return await this.eventsService.getEventList();
    }

    @Get(':id')
    @Permissions('csgames-api:get:event')
    public async getById(@Param('id') id: string): Promise<Events> {
        return await this.eventsService.findOne({
            _id: id
        });
    }

    @Get(':id/attendee')
    @Permissions('csgames-api:get:attendee')
    public async hasAttendee(@User() user: UserModel, @Param('id') eventId: string): Promise<{ registered: boolean }> {
        return {
            registered: await this.eventsService.hasAttendeeForUser(eventId, user.id)
        };
    }

    @Get(':id/vegetarian')
    @HttpCode(200)
    @Permissions('csgames-api:get-vegetarian:event')
    public async getVegetarianAttendees(@Param('id') eventId: string): Promise<number> {
        const event = await this.eventsService.findById(eventId);

        if (!event) {
            throw new EventNotFoundException();
        }

        const attendeeIds = event.attendees.map(attendee => attendee.attendee);

        const attendees = await this.attendeesService.find({
            _id: {
                $in: attendeeIds
            },
            hasDietaryRestrictions: true,
            dietaryRestrictions: {$regex: /^v/i}
        });

        return attendees.length;
    }

    @Put('registration')
    public async confirmRegistration(@Body(NullPipe, ValidationPipe) dto: UpdateAttendeeDto, @UploadedFile() file: Express.Multer.File,
                                     @User() user: UserModel, @EventId() eventId: string) {
        await this.eventsService.confirmAttendee(eventId, user.username, dto, file);
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

    @Get(':id/activity')
    @Permissions('csgames-api:get-all:activity')
    public async getActivity(@Param('id') eventId: string): Promise<Activities[]> {
        return await this.eventsService.getActivities(eventId);
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
