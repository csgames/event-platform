import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { STSService, UserModel } from '@polyhx/nest-services';
import { Permissions } from '../../../decorators/permission.decorator';
import { PermissionsGuard } from '../../../guards/permission.guard';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { Attendees } from '../attendees/attendees.model';
import { AttendeesService } from '../attendees/attendees.service';
import { CreateActivityDto, SendNotificationDto } from './activities.dto';
import { Activities, ActivityTypes } from './activities.model';
import { ActivitiesService } from './activities.service';

@ApiUseTags('Activity')
@Controller("activity")
@UseGuards(PermissionsGuard)
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService,
                private readonly attendeesService: AttendeesService,
                private readonly stsService: STSService) {
    }

    @Post()
    @Permissions('event_management:create:activity')
    public async create(@Body(new ValidationPipe()) createActivityDto: CreateActivityDto) {
        await this.activitiesService.create(createActivityDto);
    }

    @Get()
    @Permissions('event_management:get-all:activity')
    public async getAll(): Promise<Activities[]> {
        return await this.activitiesService.findAll();
    }

    @Put(':activity_id/:attendee_id')
    @Permissions('event_management:add-attendee:activity')
    public async addAttendee(@Param('activity_id') activityId: string,
                             @Param('attendee_id') attendeeId: string): Promise<Activities> {
        const activity: Activities = await this.activitiesService.findById(activityId);

        if (!activity) {
            throw new HttpException(`Activity ${activityId} not found.`, HttpStatus.NOT_FOUND);
        }

        const attendee: Attendees = await this.attendeesService.findById(attendeeId);

        if (!attendee) {
            throw new HttpException(`Attendee ${attendeeId} not found.`, HttpStatus.NOT_FOUND);
        }

        if (activity.attendees.indexOf(attendeeId) > -1) {
            throw new HttpException(`Attendee ${attendeeId} is already a participant to activity ${activityId}.`,
                HttpStatus.EXPECTATION_FAILED);
        }

        activity.attendees.push(attendeeId);

        await activity.save();
        return activity;
    }

    @Get('type')
    @Permissions('event_management:get:activity')
    public async getActivityTypes(): Promise<string[]> {
        return ActivityTypes;
    }

    @Get(':id/raffle')
    @Permissions('event_management:raffle:activity')
    public async raffle(@Param('id') activityId: string): Promise<UserModel> {
        const activity: Activities = await this.activitiesService.findById(activityId);

        if (!activity) {
            throw new HttpException(`Activity ${activityId} not found.`, HttpStatus.NOT_FOUND);
        }

        const attendees: string[] = activity.attendees as string[];

        if (attendees.length === 0) {
            throw new HttpException(`Activity ${activityId} has no attendee.`, HttpStatus.EXPECTATION_FAILED);
        }

        const winnerId = this.getRandomIndex(attendees.length);
        const attendee = await this.attendeesService.findById(attendees[winnerId]);

        return (await this.stsService.getAllWithIds([attendee.userId])).users[0];
    }

    @Get(":activity_id/:attendee_id/subscription")
    @Permissions("event_management:get:activity")
    public async getAttendeeSubscription(@Param('activity_id') activityId: string, @Param('attendee_id') attendeeId: string) {
        await this.activitiesService.getAttendeeSubscription(activityId, attendeeId);
    }

    @Put(":activity_id/:attendee_id/subscription")
    @Permissions("event_management:get:activity")
    public async subscribeAttendee(@Param('activity_id') activityId: string, @Param('attendee_id') attendeeId: string) {
        await this.activitiesService.subscribeAttendee(activityId, attendeeId);
    }

    @Delete(":activity_id/:attendee_id/subscription")
    @Permissions("event_management:get:activity")
    public async unsubscribeAttendee(@Param('activity_id') activityId: string, @Param('attendee_id') attendeeId: string) {
        await this.activitiesService.unsubscribeAttendee(activityId, attendeeId);
    }

    @Post(":id/notification")
    @Permissions("event_management:update:activity")
    public async createNotification(@Param("id") id: string, @Body(ValidationPipe) dto: SendNotificationDto) {
        await this.activitiesService.createNotification(id, dto);
    }

    private getRandomIndex(size: number) {
        return Math.floor(Math.random() * Math.floor(size));
    }
}
