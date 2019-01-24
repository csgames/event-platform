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

    @Post()
    @Permissions('event_management:create-join:team') // TODO: Mettre des permissions appropriees, doit etre appele par l'admin
    public async createTeam(@User() user: UserModel, @Body(new ValidationPipe()) createTeamDto: CreateTeamDto) {
        return this.teamsService.createTeam(createTeamDto, user.id);
    }

    // TODO: add permissions here
    @Delete(':teamName')
    public async deleteTeam(@Param('teamName') teamName: String) {
        return this.teamsService.deleteTeam(teamName);
    }

    // TODO: add permissions here
    @Put()
    public async updateTeam(@Body(new ValidationPipe()) updateTeamDto: UpdateTeamDto) {
        return this.teamsService.updateTeam();
    }


    // # create team
    // create un team captain == create user avec isCaptain a true
    // invite member send email unique link --> first name last name email
    // delete member
    // update team
    // # delete team
    

    @Get()
    @Permissions('event_management:get-all:team')
    public async getAll(): Promise<Teams[]> {
        return this.teamsService.findAll({
            path: 'attendees',
            model: 'attendees'
        });
    }

    @Get('info')
    @Permissions('event_management:get:team')
    public async getInfo(@User() user: UserModel, @Query('event') event: string): Promise<Teams> {
        return this.getTeamByUserAndEvent(event, user.id);
    }

    @Get('event/:eventId/user/:userId')
    @Permissions('event_management:get:team')
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
            a.user = (await this.stsService.getAllWithIds([a.userId])).users[0];
            a.status = await this.eventsService.getAttendeeStatus(a._id, team.event as string);
        }
        return team;
    }

    @Get(':id')
    @Permissions('event_management:get:team')
    public async get(@Param('id') id: string): Promise<Teams> {
        const team = await this.teamsService.findOneLean({
            _id: id
        }, {
            path: 'attendees',
            model: 'attendees'
        });
        for (const a of team.attendees as (Attendees & { status: string })[]) {
            a.user = (await this.stsService.getAllWithIds([a.userId])).users[0];
            a.status = await this.eventsService.getAttendeeStatus(a._id, team.event as string);
        }
        return team;
    }
/*
    @Delete(':id')
    @Permissions('event_management:leave:team')
    public async leave(@User() user: UserModel, @Param('id') teamId: string): Promise<LeaveTeamResponse> {
        const attendee = await this.attendeesService.findOne({
            userId: user.id
        });
        return this.teamsService.leave({
            teamId,
            attendeeId: attendee._id
        });
    }
    */
}
