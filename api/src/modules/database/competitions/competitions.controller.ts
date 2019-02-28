import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { EventId } from '../../../decorators/event-id.decorator';
import { Permissions } from '../../../decorators/permission.decorator';
import { PermissionsGuard } from '../../../guards/permission.guard';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { Attendees } from '../attendees/attendees.model';
import { CreateCompetitionDto, CreateDirectorDto } from './competitions.dto';
import { Competitions } from './competitions.model';
import { CompetitionsService } from './competitions.service';
import { User } from '../../../decorators/user.decorator';
import { UserModel } from '../../../models/user.model';

@ApiUseTags('Competition')
@Controller('competition')
@UseGuards(PermissionsGuard)
export class CompetitionsController {
    constructor(private competitionService: CompetitionsService) {
    }

    @Post()
    @Permissions('csgames-api:create:competition')
    public async create(@EventId() eventId: string, @Body(ValidationPipe) dto: CreateCompetitionDto): Promise<Competitions> {
        return await this.competitionService.create({
            ...dto,
            event: eventId
        });
    }

    @Post(':id/director')
    @Permissions('csgames-api:update:competition', 'csgames-api:create:attendee')
    public async createDirector(@EventId() eventId: string,
                                @Param('id') competitionId: string,
                                @Body(ValidationPipe) dto: CreateDirectorDto): Promise<Attendees> {
        return await this.competitionService.createDirector(eventId, competitionId, dto);
    }

    @Put(':id/subscription')
    @Permissions('csgames-api:subscribe:competition')
    public async subscribe(@EventId() eventId: string,
                           @Param('id') competitionId: string,
                           @User() user: UserModel) {
        await this.competitionService.subscribe(eventId, competitionId, user);
    }

    @Put(':id/director/:attendeeId')
    @Permissions('csgames-api:update:competition')
    public async addDirector(@EventId() eventId: string,
                             @Param('id') competitionId: string,
                             @Param('attendeeId') attendeeId: string): Promise<void> {
        return await this.competitionService.addDirector(eventId, competitionId, attendeeId);
    }

    @Delete(':id/subscription')
    @Permissions('csgames-api:subscribe:competition')
    public async unsubscribe(@EventId() eventId: string,
                           @Param('id') competitionId: string,
                           @User() user: UserModel) {
        await this.competitionService.unsubscribe(eventId, competitionId, user);
    }

    @Delete(':id/director/:attendeeId')
    @Permissions('csgames-api:update:competition')
    public async removeDirector(@EventId() eventId: string,
                                @Param('id') competitionId: string,
                                @Param('attendeeId') attendeeId: string): Promise<void> {
        return await this.competitionService.removeDirector(eventId, competitionId, attendeeId);
    }
}
