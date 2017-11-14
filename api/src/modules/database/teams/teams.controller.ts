import * as express from "express";
import { Body, Controller, Get, Post, Req, UseFilters, UseGuards } from "@nestjs/common";
import { Permissions } from "../../../decorators/permission.decorator";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { CodeExceptionFilter } from "../../../filters/CodedError/code.filter";
import { CreateTeamDto, JoinOrLeaveTeamDto } from "./teams.dto";
import { Teams } from "./teams.model";
import { TeamsService } from "./teams.service";
import { codeMap } from "./teams.exception";

@Controller("team")
@UseGuards(PermissionsGuard)
@UseFilters(new CodeExceptionFilter(codeMap))
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

    @Post('join')
    @Permissions('event_management:join:team')
    public async join(@Body() joinTeamDto: JoinOrLeaveTeamDto) {
        return { team: await this.teamsService.join(joinTeamDto.attendeeId, joinTeamDto.teamId) };
    }

    @Post("leave")
    @Permissions('event_management:leave:team')
    public async leave(@Body() leaveTeamDto: JoinOrLeaveTeamDto) {
        return await this.teamsService.leave(leaveTeamDto.attendeeId, leaveTeamDto.teamId);
    }
}
