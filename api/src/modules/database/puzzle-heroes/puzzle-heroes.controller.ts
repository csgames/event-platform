import {
    BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, UploadedFile, UseGuards
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EventId } from "../../../decorators/event-id.decorator";
import { Permissions } from "../../../decorators/permission.decorator";
import { User } from "../../../decorators/user.decorator";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { UserModel } from "../../../models/user.model";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { QuestionAnswerDto } from "../questions/question-answer.dto";
import { UpdateQuestionDto } from "../questions/questions.dto";
import { PuzzleGraphNodes } from "./puzzle-graph-nodes/puzzle-graph.nodes.model";
import { CreatePuzzleDto, CreatePuzzleHeroDto, CreateTrackDto, UpdatePuzzleHeroDto, UpdateTrackDto } from "./puzzle-heroes.dto";
import { PuzzleHeroes } from "./puzzle-heroes.model";
import { PuzzleHeroesService, PuzzleHeroInfo } from "./puzzle-heroes.service";
import { Score } from "./scoreboard/score.model";
import { TeamSeries } from "./scoreboard/team-series.model";
import { Tracks } from "./tracks/tracks.model";
import { AnswerData } from "./tracks/tracks-answers.model";

@ApiTags("PuzzleHero")
@Controller("puzzle-hero")
@UseGuards(PermissionsGuard)
export class PuzzleHeroesController {
    constructor(private puzzleHeroService: PuzzleHeroesService) {
    }

    @Post()
    @Permissions("csgames-api:create:puzzle-hero")
    public async create(@Body(new ValidationPipe()) dto: CreatePuzzleHeroDto, @EventId() eventId: string): Promise<PuzzleHeroes> {
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

    @Put()
    @Permissions("csgames-api:create:puzzle-hero")
    public async update(@Body(new ValidationPipe()) dto: UpdatePuzzleHeroDto, @EventId() eventId: string): Promise<void> {
        await this.puzzleHeroService.updatePuzzleHero(eventId, dto);
    }

    @Post("start")
    @Permissions("csgames-api:create:puzzle-hero")
    public async start(@EventId() eventId: string): Promise<void> {
        await this.puzzleHeroService.start(eventId);
    }

    @Post("track")
    @Permissions("csgames-api:create:puzzle-hero")
    public async createTrack(@Body(new ValidationPipe()) dto: CreateTrackDto, @EventId() eventId: string): Promise<Tracks> {
        return await this.puzzleHeroService.createTrack(eventId, dto);
    }

    @Put("track/:id")
    @Permissions("csgames-api:create:puzzle-hero")
    public async updateTrack(@Param("id") id: string,
                             @Body(new ValidationPipe()) dto: UpdateTrackDto, @EventId() eventId: string): Promise<void> {
        return await this.puzzleHeroService.updateTrack(eventId, id, dto);
    }

    @Post("track/:trackId/puzzle")
    @Permissions("csgames-api:create:puzzle-hero")
    public async createPuzzle(@Body(new ValidationPipe()) dto: CreatePuzzleDto,
                              @Param("trackId") trackId: string,
                              @EventId() eventId: string): Promise<PuzzleGraphNodes> {
        return await this.puzzleHeroService.createPuzzle(eventId, trackId, dto);
    }

    @Put("track/:trackId/puzzle/:puzzleId")
    @Permissions("csgames-api:create:puzzle-hero")
    public async updatePuzzle(@Body(new ValidationPipe()) dto: UpdateQuestionDto,
                              @Param("trackId") trackId: string,
                              @Param("puzzleId") puzzleId: string,
                              @UploadedFile("file") file: Express.Multer.File,
                              @EventId() eventId: string): Promise<void> {
        return await this.puzzleHeroService.updatePuzzle(eventId, trackId, puzzleId, dto);
    }

    @Post("puzzle/:puzzleId/validate")
    @Permissions("csgames-api:validate-puzzle:puzzle-hero")
    @HttpCode(HttpStatus.OK)
    public async validateAnswer(@EventId() id: string,
                                @Param("puzzleId") puzzleId,
                                @Body(new ValidationPipe()) dto: QuestionAnswerDto,
                                @UploadedFile("file") file: Express.Multer.File,
                                @User() user: UserModel): Promise<void> {
        return await this.puzzleHeroService.validateAnswer({
            ...dto,
            file
        }, puzzleId, id, user.username);
    }

    @Get()
    @Permissions("csgames-api:get:puzzle-hero")
    public async get(@EventId() eventId: string, @User() user: UserModel,
                     @Query("type") type: string): Promise<PuzzleHeroes> {
        return await this.puzzleHeroService.getByEvent(eventId, user, type);
    }

    @Get("info")
    @Permissions("csgames-api:get:puzzle-hero")
    public async getInfo(@EventId() eventId: string): Promise<PuzzleHeroInfo> {
        return await this.puzzleHeroService.getInfo(eventId);
    }

    @Get("scoreboard")
    @Permissions("csgames-api:get:puzzle-hero")
    public async getScoreboard(@EventId() eventId: string, @User() user: UserModel): Promise<Score[]> {
        return await this.puzzleHeroService.getScoreboard(eventId, user);
    }

    @Get("team-series")
    @Permissions("csgames-api:get:puzzle-hero")
    public async getTeamsSeries(@EventId() eventId: string,
                                @User() user: UserModel, @Query("teams-ids") teamsIds: string): Promise<TeamSeries[]> {
        return await this.puzzleHeroService.getTeamsSeries(eventId, user, teamsIds.split(","));
    }

    @Get("puzzle/:puzzleId/:answerId/data")
    @Permissions("csgames-api:update:puzzle-hero")
    public async getAnswerData(@EventId() eventId: string,
                               @Param("puzzleId") puzzleId: string,
                               @Param("answerId") answerId: string): Promise<AnswerData> {
        return this.puzzleHeroService.getAnswerData(eventId, puzzleId, answerId);
    }

    @Put("puzzle/:puzzleId/:answerId")
    @Permissions("csgames-api:update:puzzle-hero")
    public async validateAnswerManually(@EventId() eventId: string,
                               @Param("puzzleId") puzzleId: string,
                               @Param("answerId") answerId: string): Promise<void> {
        await this.puzzleHeroService.manualValidation(eventId, puzzleId, answerId);
    }

    @Delete("puzzle/:puzzleId/:answerId")
    @Permissions("csgames-api:update:puzzle-hero")
    public async refuseAnswerManually(@EventId() eventId: string,
                               @Param("puzzleId") puzzleId: string,
                               @Param("answerId") answerId: string): Promise<void> {
        await this.puzzleHeroService.refuseValidation(eventId, puzzleId, answerId);
    }

    @Patch("scoreboard")
    @Permissions("csgames-api:update:puzzle-hero")
    public async resetScoreboard(@EventId() eventId: string) {
        this.puzzleHeroService.populateScoreboard(eventId);
    }
}
