import {
    BadRequestException, Body, Controller, Delete, Get, Headers, Param, Post, Query, UseFilters, UseGuards
} from '@nestjs/common';
import { Permissions } from '../../../decorators/permission.decorator';
import { PermissionsGuard } from '../../../guards/permission.guard';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { CodeExceptionFilter } from '../../../filters/CodedError/code.filter';
import { CreateOrJoinTeamDto } from './teams.dto';
import { Teams } from './teams.model';
import { TeamsService } from './teams.service';
import { codeMap } from './teams.exception';
import { AttendeesService } from '../attendees/attendees.service';
import { STSService } from '@polyhx/nest-services';
import { Attendees } from '../attendees/attendees.model';
import { EventsService } from '../events/events.service';
import { ApiUseTags } from '@nestjs/swagger';

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
    @Permissions('event_management:create-join:team')
    async createOrJoin(@Headers('token-claim-user_id') userId: string,
                       @Body(new ValidationPipe()) createOrJoinTeamDto: CreateOrJoinTeamDto) {
        return this.teamsService.createOrJoin(createOrJoinTeamDto, userId);
    }

    @Get()
    @Permissions('event_management:get-all:team')
    async getAll(): Promise<Teams[]> {
        return this.teamsService.findAll({
            path: 'attendees',
            model: 'attendees'
        });
    }

    @Get('info')
    @Permissions('event_management:get:team')
    async getInfo(@Headers('token-claim-user_id') userId: string, @Query('event') event: string): Promise<Teams> {
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

        for (let a of team.attendees as (Attendees & { status: string })[]) {
            a.user = (await this.stsService.getAllWithIds([a.userId])).users[0];
            a.status = await this.eventsService.getAttendeeStatus(a._id, team.event as string);
        }
        return team;
    }

    @Get(':id')
    @Permissions('event_management:get:team')
    async get(@Param('id') id: string): Promise<Teams> {
        const team = await this.teamsService.findOneLean({
            _id: id
        }, {
            path: 'attendees',
            model: 'attendees'
        });
        for (let a of team.attendees as Attendees[]) {
            a.user = (await this.stsService.getAllWithIds([a.userId])).users[0];
        }
        return team;
    }

    @Delete(':id')
    @Permissions('event_management:leave:team')
    public async leave(@Headers('token-claim-user_id') userId: string, @Param('id') teamId: string) {
        const attendee = await this.attendeesService.findOne({userId: userId});
        return this.teamsService.leave({teamId, attendeeId: attendee._id, event: null});
    }
}
