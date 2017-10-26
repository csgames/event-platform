import * as express from "express";
import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { AttendeesService } from "./attendees.service";
import { CreateAttendeeDto } from "./attendees.dto";
import { Attendees } from "./attendees.model";
import { ValidationPipe } from "../../../pipes/validation.pipe";

@Controller("attendee")
export class AttendeesController {
    constructor(private readonly attendeesService: AttendeesService) {
    }

    @Post()
    async create(@Req() req: express.Request, @Body(new ValidationPipe()) createAttendeeDto: CreateAttendeeDto) {
        await this.attendeesService.create(createAttendeeDto);
    }

    @Get()
    async getAll(): Promise<Attendees[]> {
        return this.attendeesService.findAll();
    }
}
