import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, UseFilters, UseGuards, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { STSService } from '@polyhx/nest-services';
import { Permissions } from '../../../decorators/permission.decorator';
import { User } from '../../../decorators/user.decorator';
import { CodeExceptionFilter } from '../../../filters/code-error/code.filter';
import { PermissionsGuard } from '../../../guards/permission.guard';
import { UserModel } from '../../../models/user.model';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { Attendees } from '../attendees/attendees.model';
import { AttendeesService } from '../attendees/attendees.service';
import { EventsService } from '../events/events.service';
import { CreateTeamDto, UpdateTeamDto } from './teams.dto';
import { codeMap } from './teams.exception';
import { Teams } from './teams.model';
import { LeaveTeamResponse, TeamsService } from './teams.service';

@ApiUseTags('Team')
@Controller('team')
@UseGuards(PermissionsGuard)
@UseFilters(new CodeExceptionFilter(codeMap))
export class TeamsController {
    constructor(private readonly teamsService: TeamsService,
                private readonly attendeesService: AttendeesService,
                private readonly eventsService: EventsService,
                private readonly stsService: STSService) {
    }

    @Put(':id')
    @Permissions('csgames-api:update:team')
    public async updateTeam(@Body(new ValidationPipe()) updateTeamDto: UpdateTeamDto, @Param('id') id: string) {
        return this.teamsService.updateTeam(id, updateTeamDto);
    }

    @Get()
    @Permissions('csgames-api:get-all:team')
    public async getAll(): Promise<Teams[]> {
        return this.teamsService.findAll({
            path: 'attendees',
            model: 'attendees'
        });
    }

    @Get('info')
    @Permissions('csgames-api:get:team')
    public async getInfo(@User() user: UserModel, @Query('event') event: string): Promise<Teams> {
        return this.getTeamByUserAndEvent(event, user.id);
    }

    @Get('event/:eventId/user/:userId')
    @Permissions('csgames-api:get:team')
    public async getTeamByUserAndEvent(@Param('eventId') event: string, @Param('userId') userId: string): Promise<Teams> {
        if (!event) {
            throw new BadRequestException('Event not specified');
        }

        const attendee = await this.attendeesService.findOne({userId: userId});
        if (!attendee) {
            return null;
        }

        const team = await this.teamsService.findOneLean({
            attendees: attendee._id,
            event
        }, {
            path: 'attendees',
            model: 'attendees'
        });

        if (!team) {
            return null;
        }

        for (const a of team.attendees as (Attendees & { status: string })[]) {
            a.user = (await this.stsService.getAllWithIds([a.email])).users[0];
        }
        return team;
    }

    @Get(':id')
    @Permissions('csgames-api:get:team')
    public async get(@Param('id') id: string): Promise<Teams> {
        const team = await this.teamsService.findOneLean({
            _id: id
        }, {
            path: 'attendees',
            model: 'attendees'
        });
        for (const a of team.attendees as (Attendees & { status: string })[]) {
            a.user = (await this.stsService.getAllWithIds([a.email])).users[0];
        }
        return team;
    }
}
