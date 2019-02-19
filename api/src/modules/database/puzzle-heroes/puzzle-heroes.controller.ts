import { BadRequestException, Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Permissions } from '../../../decorators/permission.decorator';
import { PermissionsGuard } from '../../../guards/permission.guard';
import { PuzzleHeroesService } from './puzzle-heroes.service';
import { PuzzleHeroes } from './puzzle-heroes.model';
import { EventId } from '../../../decorators/event-id.decorator';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { CreatePuzzleDto, CreatePuzzleHeroDto, CreateTrackDto } from './puzzle-heroes.dto';
import { User } from '../../../decorators/user.decorator';
import { UserModel } from '../../../models/user.model';
import { PuzzleGraphNodes } from './puzzle-graph-nodes/puzzle-graph.nodes.model';
import { Tracks } from './tracks/tracks.model';

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
    public async createTrack(@Body(ValidationPipe) dto: CreateTrackDto, @EventId() eventId: string): Promise<Tracks> {
        return await this.puzzleHeroService.createTrack(eventId, dto);
    }

    @Post('track/:trackId/puzzle')
    @Permissions('csgames-api:create:puzzle-hero')
    public async createPuzzle(@Body(ValidationPipe) dto: CreatePuzzleDto,
                              @Param('trackId') trackId: string,
                              @EventId() eventId: string): Promise<PuzzleGraphNodes> {
        return await this.puzzleHeroService.createPuzzle(eventId, trackId, dto);
    }

    @Post("validate")
    @Permissions('csgames-api:get:event')
    public async validateAnswer(@EventId() id: string): Promise<null> {
        console.log("VALIDATE IS CALLED");
        return null;
    }

    @Get()
    @Permissions('csgames-api:get:puzzle-hero')
    public async get(@EventId() eventId: string, @User() user: UserModel): Promise<PuzzleHeroes> {
        return await this.puzzleHeroService.getByEvent(eventId, user.username);
    }
}
