import * as express from "express";
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ActivitiesService } from "./activities.service";
import { CreateActivityDto } from "./activities.dto";
import { Activities } from "./activities.model";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { Permissions } from "../../../decorators/permission.decorator";

@Controller("activity")
@UseGuards(PermissionsGuard)
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {
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
}
