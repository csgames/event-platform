import * as express from "express";
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { CreateTeamDto } from "./teams.dto";
import { Teams } from "./teams.model";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { Permissions } from "../../../decorators/permission.decorator";

@Controller("team")
@UseGuards(PermissionsGuard)
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {
    }

    @Post()
    @Permissions('event_management:create:team')
    async create(@Req() req: express.Request, @Body(new ValidationPipe()) createTeamDto: CreateTeamDto) {
        await this.teamsService.create(createTeamDto);
    }

    @Get()
    @Permissions('event_management:get-all:team')
    async getAll(): Promise<Teams[]> {
        return await this.teamsService.findAll();
    }
}
