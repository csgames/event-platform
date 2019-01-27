import { BadRequestException, Body, Controller, Get, Param, Put, UseFilters, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { EventId } from '../../../decorators/event-id.decorator';
import { Permissions } from '../../../decorators/permission.decorator';
import { User } from '../../../decorators/user.decorator';
import { CodeExceptionFilter } from '../../../filters/code-error/code.filter';
import { PermissionsGuard } from '../../../guards/permission.guard';
import { UserModel } from '../../../models/user.model';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { AttendeesService } from '../attendees/attendees.service';
import { UpdateTeamDto } from './teams.dto';
import { codeMap } from './teams.exception';
import { Teams } from './teams.model';
import { TeamsService } from './teams.service';

@ApiUseTags('Team')
@Controller('team')
@UseGuards(PermissionsGuard)
@UseFilters(new CodeExceptionFilter(codeMap))
export class TeamsController {
    constructor(private readonly teamsService: TeamsService,
                private readonly attendeesService: AttendeesService) {
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
    public async getInfo(@User() user: UserModel, @EventId() eventId: string): Promise<Teams> {
        return this.getTeamByUserAndEvent(eventId, user.username);
    }

    @Get('event/:eventId/user/:email')
    @Permissions('csgames-api:get:team')
    public async getTeamByUserAndEvent(@Param('eventId') event: string, @Param('email') email: string): Promise<Teams> {
        if (!event) {
            throw new BadRequestException('Event not specified');
        }

        const attendee = await this.attendeesService.findOne({ email });
        if (!attendee) {
            return null;
        }

        return await this.teamsService.findOneLean({
            attendees: attendee._id,
            event
        }, [{
            path: 'attendees',
            model: 'attendees',
            select: ['email', 'firstName', 'github', 'lastName', 'linkedIn', 'website']
        }, {
            path: 'school',
            model: 'schools'
        }]);
    }

    @Get(':id')
    @Permissions('csgames-api:get:team')
    public async get(@Param('id') id: string): Promise<Teams> {
        return await this.teamsService.findOneLean({
            _id: id
        }, [{
            path: 'attendees',
            model: 'attendees'
        }, {
            path: 'school',
            model: 'schools'
        }]);
    }
}
