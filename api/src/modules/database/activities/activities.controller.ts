import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { STSService } from "@polyhx/nest-services";
import { Permissions } from "../../../decorators/permission.decorator";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { Attendees } from "../attendees/attendees.model";
import { AttendeesService } from "../attendees/attendees.service";
import { CreateActivityDto, SendNotificationDto } from "./activities.dto";
import { Activities, ActivityTypes } from "./activities.model";
import { ActivitiesService } from "./activities.service";

@ApiTags("Activity")
@Controller("activity")
@UseGuards(PermissionsGuard)
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService,
                private readonly attendeesService: AttendeesService,
                private readonly stsService: STSService) {
    }

    @Post()
    @Permissions("csgames-api:create:activity")
    public async create(@Body(new ValidationPipe()) createActivityDto: CreateActivityDto) {
        await this.activitiesService.create(createActivityDto);
    }

    @Get()
    @Permissions("csgames-api:get-all:activity")
    public async getAll(): Promise<Activities[]> {
        return await this.activitiesService.findAll();
    }

    @Put(":activity_id/:attendee_id")
    @Permissions("csgames-api:add-attendee:activity")
    public async addAttendee(@Param("activity_id") activityId: string,
                             @Param("attendee_id") attendeeId: string): Promise<Activities> {
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

    @Get("type")
    @Permissions("csgames-api:get:activity")
    public async getActivityTypes(): Promise<string[]> {
        return ActivityTypes;
    }

    @Get(":activity_id/:attendee_id/subscription")
    @Permissions("csgames-api:get:activity")
    public async getAttendeeSubscription(@Param("activity_id") activityId: string, @Param("attendee_id") attendeeId: string) {
        await this.activitiesService.getAttendeeSubscription(activityId, attendeeId);
    }

    @Get(":activity_id")
    @Permissions("csgames-api:get:activity")
    public async getActivity(@Param("activity_id") activityId: string) {
        return await this.activitiesService.findById(activityId);
    }

    @Put(":activity_id/:attendee_id/subscription")
    @Permissions("csgames-api:get:activity")
    public async subscribeAttendee(@Param("activity_id") activityId: string, @Param("attendee_id") attendeeId: string) {
        await this.activitiesService.subscribeAttendee(activityId, attendeeId);
    }

    @Delete(":activity_id/:attendee_id/subscription")
    @Permissions("csgames-api:get:activity")
    public async unsubscribeAttendee(@Param("activity_id") activityId: string, @Param("attendee_id") attendeeId: string) {
        await this.activitiesService.unsubscribeAttendee(activityId, attendeeId);
    }

    @Post(":id/notification")
    @Permissions("csgames-api:update:activity")
    public async createNotification(@Param("id") id: string, @Body(new ValidationPipe()) dto: SendNotificationDto) {
        await this.activitiesService.createNotification(id, dto);
    }

    @Put(":id")
    @Permissions("csgames-api:update:activity")
    public async update(@Param("id") id: string, @Body(new ValidationPipe()) activity: CreateActivityDto) {
        await this.activitiesService.update({
            _id: id
        }, activity);
    }
}
