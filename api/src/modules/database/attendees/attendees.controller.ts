import * as express from "express";
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AttendeesService } from "./attendees.service";
import { CreateAttendeeDto } from "./attendees.dto";
import { Attendees } from "./attendees.model";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { Permissions } from "../../../decorators/permission.decorator";

@Controller("attendee")
@UseGuards(PermissionsGuard)
export class AttendeesController {
    constructor(private readonly attendeesService: AttendeesService) {
    }

    @Post()
    @Permissions('event_management:create:attendee')
    async create(@Req() req: express.Request, @Body(new ValidationPipe()) createAttendeeDto: CreateAttendeeDto) {
        await this.attendeesService.create(createAttendeeDto);
    }

    @Get()
    @Permissions('event_management:get-all:attendee')
    async getAll(): Promise<Attendees[]> {
        return this.attendeesService.findAll();
    }
}
