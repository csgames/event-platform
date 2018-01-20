import * as express from "express";
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ActivitiesService } from "./activities.service";
import { CreateActivityDto } from "./activities.dto";
import { Activities } from "./activities.model";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { Permissions } from "../../../decorators/permission.decorator";
import { Attendees } from "../attendees/attendees.model";
import { AttendeesService } from "../attendees/attendees.service";
import { STSService, UserModel } from "@polyhx/nest-services";

@Controller("activity")
@UseGuards(PermissionsGuard)
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService,
                private readonly attendeesService: AttendeesService,
                private readonly stsService: STSService) {
    }

    @Post()
    @Permissions('event_management:create:activity')
    async create(@Req() req: express.Request, @Body(new ValidationPipe()) createActivityDto: CreateActivityDto) {
        await this.activitiesService.create(createActivityDto);
    }

    @Get()
    @Permissions('event_management:get-all:activity')
    async getAll(): Promise<Activities[]> {
        return await this.activitiesService.findAll();
    }

    @Get(':id/raffle')
    @Permissions('event_management:raffle:activity')
    async raffle(@Param('id') activityId: string): Promise<UserModel> {
        console.log(activityId);
        let activity: Activities = await this.activitiesService.findById(activityId);

        if (!activity) {
            throw new HttpException(`Activity ${activityId} not found.`, HttpStatus.NOT_FOUND);
        }

        let attendees: string[] = activity.attendees as string[];

        if (attendees.length === 0) {
            throw new HttpException(`Activity ${activityId} has no attendee.`, HttpStatus.EXPECTATION_FAILED);
        }

        let winnerId = this.getRandomIndex(attendees.length);

        let attendee = await this.attendeesService.findById(attendees[winnerId]);

        return (await this.stsService.getUser(attendee.userId)).user;
    }

    private getRandomIndex(size: number) {
        return Math.floor(Math.random() * Math.floor(size));
    }
}
