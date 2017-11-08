import * as express from "express";
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./events.dto";
import { Events } from "./events.model";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { Permissions } from "../../../decorators/permission.decorator";

@Controller("event")
@UseGuards(PermissionsGuard)
export class EventsController {
    constructor(private readonly eventsService: EventsService) {
    }

    @Post()
    @Permissions('event_management:create:event')
    async create(@Req() req: express.Request, @Body(new ValidationPipe()) createEventDto: CreateEventDto) {
        await this.eventsService.create(createEventDto);
    }

    @Get()
    @Permissions('event_management:get-all:event')
    async getAll(): Promise<Events[]> {
        return await this.eventsService.findAll();
    }
}
