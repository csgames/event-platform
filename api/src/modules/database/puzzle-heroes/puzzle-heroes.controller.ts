import { BadRequestException, Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Permissions } from '../../../decorators/permission.decorator';
import { PermissionsGuard } from '../../../guards/permission.guard';
import { PuzzleHeroesService } from './puzzle-heroes.service';
import { PuzzleHeroes } from './puzzle-heroes.model';
import { EventId } from '../../../decorators/event-id.decorator';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { CreatePuzzleDto, CreatePuzzleHeroDto, CreateTrackDto } from './puzzle-heroes.dto';

@ApiUseTags('PuzzleHero')
@Controller("puzzle-hero")
@UseGuards(PermissionsGuard)
export class PuzzleHeroesController {
    constructor(private puzzleHeroService: PuzzleHeroesService) {
    }

    @Post()
    @Permissions('csgames-api:create:puzzle-hero')
    public async create(@Body(ValidationPipe) dto: CreatePuzzleHeroDto, @EventId() eventId: string): Promise<PuzzleHeroes> {
        const puzzleHero = await this.puzzleHeroService.findOne({
            event: eventId
        });
        if (puzzleHero) {
            throw new BadRequestException("Cannot create more then one puzzle hero per event");
        }
        return await this.puzzleHeroService.create({
            ...dto,
            event: eventId
        });
    }

    @Post('track')
    @Permissions('csgames-api:create:puzzle-hero')
    public async createTrack(@Body(ValidationPipe) dto: CreateTrackDto, @EventId() eventId: string): Promise<void> {
        return await this.puzzleHeroService.createTrack(eventId, dto);
    }

    @Post('track/:trackId/puzzle')
    @Permissions('csgames-api:create:puzzle-hero')
    public async createPuzzle(@Body(ValidationPipe) dto: CreatePuzzleDto,
                              @Param('trackId') trackId: string,
                              @EventId() eventId: string): Promise<void> {
        return await this.puzzleHeroService.createPuzzle(eventId, trackId, dto);
    }

    @Get()
    @Permissions('csgames-api:get:puzzle-hero')
    public async get(@Query("team") team: string, @EventId() eventId: string): Promise<PuzzleHeroes> {
        return await this.puzzleHeroService.getByEvent(eventId, team);
    }
}
