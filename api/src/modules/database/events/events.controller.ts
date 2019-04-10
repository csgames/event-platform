import {
    Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query, UploadedFile, UseFilters, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Permissions } from '../../../decorators/permission.decorator';
import { User } from '../../../decorators/user.decorator';
import { CodeExceptionFilter } from '../../../filters/code-error/code.filter';
import { PermissionsGuard } from '../../../guards/permission.guard';
import { BufferInterceptor } from '../../../interceptors/buffer.interceptor';
import { DataGridDownloadInterceptor } from '../../../interceptors/data-grid-download.interceptor';
import { UserModel } from '../../../models/user.model';
import { ArrayPipe } from '../../../pipes/array.pipe';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { CreateActivityDto } from '../activities/activities.dto';
import { Activities } from '../activities/activities.model';
import { AttendeeNotifications } from '../attendees/attendees.model';
import { AttendeesService } from '../attendees/attendees.service';
import { Competitions } from '../competitions/competitions.model';
import { Teams } from '../teams/teams.model';
import { TeamsService } from '../teams/teams.service';
import { AddSponsorDto, CreateEventDto, SendNotificationDto, SendSmsDto, UpdateEventDto } from './events.dto';
import { codeMap, EventNotFoundException } from './events.exception';
import { Events, EventSponsorDetails, EventGuide } from './events.model';
import { EventsService } from './events.service';
import { UpdateAttendeeDto } from '../attendees/attendees.dto';
import { EventId } from '../../../decorators/event-id.decorator';
import { NullPipe } from '../../../pipes/null-pipe.service';
import { FlashOut } from '../flash-out/flash-out.model';
import { FlashOutsService } from '../flash-out/flash-out.service';
import { VotesFlashOutDto } from '../flash-out/flash-out.dto';

@ApiUseTags('Event')
@Controller('event')
@UseGuards(PermissionsGuard)
@UseFilters(new CodeExceptionFilter(codeMap))
export class EventsController {
    constructor(private attendeesService: AttendeesService,
                private eventsService: EventsService,
                private teamsService: TeamsService,
                private flashOutService: FlashOutsService) {
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

    @Get("guide")
    @Permissions('csgames-api:get:event')
    public async getGuideById(@EventId() id: string): Promise<EventGuide> {
        let event = await this.eventsService.findOne({
            _id: id
        });
        return event.guide;
    }

    @Get('sponsor')
    @Permissions('csgames-api:get-all:sponsor')
    public async getSponsor(@EventId() eventId: string): Promise<{ [tier: string]: EventSponsorDetails[] }> {
        return await this.eventsService.getSponsors(eventId);
    }

    @Get('team')
    @Permissions('csgames-api:get-all:team')
    public async eventTeamQuery(@EventId() eventId: string): Promise<Teams[]> {
        return await this.teamsService.getTeamFromEvent(eventId);
    }

    @Get('activity')
    @Permissions('csgames-api:get-all:activity')
    public async getActivity(@EventId() eventId: string, @User() user: UserModel): Promise<Activities[]> {
        return await this.eventsService.getActivities(eventId, user);
    }

    @Get('flash-out')
    @Permissions('csgames-api:get-all:flash-out')
    public async getFlashOut(@EventId() eventId: string, @User() user: UserModel): Promise<FlashOut[]> {
        return await this.flashOutService.getByEvent(eventId, user.username, user.role);
    }

    @Get('score')
    @Permissions('csgames-api:get-score:event')
    public async getScore(@EventId() eventId: string) {
        return await this.eventsService.getScore(eventId);
    }

    @Get('score/filter')
    @Permissions('csgames-api:get-score:event')
    public async getScoreFiltered(@EventId() eventId: string) {
        return await this.eventsService.getScoreFiltered(eventId);
    }

    @Put('flash-out/rating')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Permissions('csgames-api:update:flash-out')
    public async voteFlashOut(@EventId() eventId: string, @User() user: UserModel,
                              @Body(NullPipe, new ValidationPipe()) dto: VotesFlashOutDto) {
        const attendee = await this.attendeesService.findOne({ email: user.username });
        if (!attendee) {
            throw new NotFoundException();
        }

        for (const vote of dto.votes) {
            await this.flashOutService.addRating(eventId, attendee._id, vote._id, vote.rating);
        }
    }

    @Get('notification')
    @Permissions('csgames-api:get:notification')
    public async getNotifications(@EventId() eventId: string, @User() user: UserModel,
                                  @Query('seen') seen: boolean): Promise<AttendeeNotifications[]> {
        return await this.eventsService.getNotifications(eventId, user.username, seen);
    }

    @Get('competition')
    @Permissions('csgames-api:get:competition')
    public async getCompetitions(@EventId() eventId: string,
                                 @User() user: UserModel): Promise<Competitions[]> {
        return await this.eventsService.getCompetitions(eventId, user);
    }

    @Get('competition/member')
    @Permissions('csgames-api:get:competition')
    public async getCompetitionsAsMember(@EventId() eventId: string,
                                 @User() user: UserModel): Promise<Competitions[]> {
        return await this.eventsService.getCompetitionsAsMember(eventId, user);
    }

    @Get('attendee')
    @UseInterceptors(DataGridDownloadInterceptor)
    @Permissions('csgames-api:get-all:attendee')
    public async getAttendee(@EventId() eventId: string,
                             @Query('type') type: string,
                             @Query('roles', ArrayPipe) roles: string[]): Promise<any> {
        return await this.eventsService.getAttendeesData(eventId, type, roles);
    }

    @Get('attendee/cv')
    @UseInterceptors(new BufferInterceptor("application/zip"))
    @Permissions('csgames-api:get-all:attendee')
    public async getAttendeeCv(@EventId() eventId: string): Promise<any> {
        return await this.eventsService.getAttendeeCv(eventId);
    }

    @Post('sms')
    @Permissions('csgames-api:update:event')
    public async sendSms(@EventId() eventId: string, @Body(new ValidationPipe()) dto: SendSmsDto) {
        await this.eventsService.sendSms(eventId, dto.text);
    }

    @Post('notification')
    @Permissions('csgames-api:update:event')
    public async createNotification(@EventId() eventId: string, @Body(new ValidationPipe()) dto: SendNotificationDto) {
        await this.eventsService.createNotification(eventId, dto);
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

    @Get(':id')
    @Permissions('csgames-api:get:event')
    public async getById(@Param('id') id: string): Promise<Events> {
        return await this.eventsService.findOne({
            _id: id
        });
    }

    @Put('registration')
    public async confirmRegistration(@Body(NullPipe, new ValidationPipe()) dto: UpdateAttendeeDto,
                                     @UploadedFile() file: Express.Multer.File,
                                     @User() user: UserModel,
                                     @EventId() eventId: string) {
        await this.eventsService.confirmAttendee(eventId, user.username, dto, file);
    }

    @Put('activity')
    @Permissions('csgames-api:update:event')
    public async addActivity(@EventId() eventId: string, @Body(new ValidationPipe()) activity: CreateActivityDto) {
        await this.eventsService.createActivity(eventId, activity);
    }

    @Put(':id/sponsor')
    @Permissions('csgames-api:update:event')
    public async addSponsor(@Param('id') eventId: string, @Body(new ValidationPipe()) dto: AddSponsorDto): Promise<Events> {
        return await this.eventsService.addSponsor(eventId, dto);
    }

    @Put()
    @Permissions('csgames-api:update:event')
    public async update(@EventId() eventId: string, @Body(new ValidationPipe()) event: UpdateEventDto) {
        await this.eventsService.update({
            _id: eventId
        }, event);
    }
}
