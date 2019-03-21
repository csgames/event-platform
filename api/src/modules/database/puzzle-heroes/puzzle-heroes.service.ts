import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '../../../services/base.service';
import { DateUtils } from '../../../utils/date.utils';
import { PuzzleHeroes, PuzzleHeroesUtils } from './puzzle-heroes.model';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Tracks, TracksUtils } from './tracks/tracks.model';
import { PuzzleGraphNodes } from './puzzle-graph-nodes/puzzle-graph.nodes.model';
import { CreatePuzzleDto, CreateTrackDto, UpdatePuzzleHeroDto, UpdateTrackDto } from './puzzle-heroes.dto';
import { Questions } from '../questions/questions.model';
import { Attendees } from '../attendees/attendees.model';
import { Teams } from '../teams/teams.model';
import { RedisService } from '../../redis/redis.service';
import { Score } from './scoreboard/score.model';
import { Schools } from '../schools/schools.model';
import { Serie, TeamSeries } from './scoreboard/team-series.model';
import { PuzzleHeroesGateway } from './puzzle-heroes.gateway';
import { QuestionsService } from '../questions/questions.service';
import { TracksAnswers, TracksAnswersUtils } from './tracks/tracks-answers.model';
import { QuestionAnswerDto } from '../questions/question-answer.dto';
import { UserModel } from '../../../models/user.model';
import { UpdateQuestionDto } from '../questions/questions.dto';

export interface PuzzleDefinition extends PuzzleGraphNodes {
    completed: boolean;
    locked: boolean;
    label: string;
    description: { [lang: string]: string };
    type: string;
    inputType: string;
}

export interface PuzzleHeroInfo {
    open: boolean;
    scoreboardOpen: boolean;
}

@Injectable()
export class PuzzleHeroesService extends BaseService<PuzzleHeroes, PuzzleHeroes> {
    constructor(@InjectModel('puzzle-heroes') private readonly puzzleHeroesModel: Model<PuzzleHeroes>,
                @InjectModel('questions') private readonly questionsModel: Model<Questions>,
                @InjectModel('attendees') private readonly attendeesModel: Model<Attendees>,
                @InjectModel('teams') private readonly teamsModel: Model<Teams>,
                @InjectModel('schools') private readonly schoolsModel: Model<Schools>,
                private questionsService: QuestionsService,
                private puzzleHeroesGateway: PuzzleHeroesGateway,
                private redisService: RedisService) {
        super(puzzleHeroesModel);
    }

    public async updatePuzzleHero(eventId: string, dto: UpdatePuzzleHeroDto) {
        const puzzleHero = await this.puzzleHeroesModel.findOne({
            event: eventId
        }).exec();

        if (!puzzleHero) {
            throw new NotFoundException('No puzzle hero found');
        }

        await this.puzzleHeroesModel.update({_id: puzzleHero._id}, dto).exec();
    }

    public async getByEvent(eventId: string, user: UserModel, type: string): Promise<PuzzleHeroes> {
        const puzzleHero = await this.puzzleHeroesModel.findOne({
            event: eventId
        }).populate({
            path: 'tracks.puzzles.question',
            model: 'questions'
        }).exec();
        if (!puzzleHero) {
            throw new NotFoundException('No puzzle hero found');
        }

        switch (user.role) {
            case 'captain':
            case 'attendee':
            case 'godparent':
                return this.getPuzzleHeroForAttendee(eventId, user, type, puzzleHero);
            case 'admin':
                return puzzleHero;
        }
    }

    private async getPuzzleHeroForAttendee(eventId: string,
                                           user: UserModel, type: string, puzzleHero: PuzzleHeroes): Promise<PuzzleHeroes> {
        if (!PuzzleHeroesUtils.isAvailable(puzzleHero)) {
            return {
                endDate: puzzleHero.endDate,
                releaseDate: puzzleHero.releaseDate,
                open: puzzleHero.open
            } as PuzzleHeroes;
        }

        const teamId = await this.getTeamId(user.username, eventId);
        const res = [];
        for (const track of puzzleHero.tracks) {
            if (!TracksUtils.isAvailable(track)) {
                continue;
            }
            const t = await this.formatTrack(track.toJSON(), puzzleHero, teamId, type);
            if (t.puzzles.length > 0) {
                res.push(t);
            }
        }

        return {
            tracks: res,
            endDate: puzzleHero.endDate,
            releaseDate: puzzleHero.releaseDate
        } as PuzzleHeroes;
    }

    public async getInfo(eventId: string): Promise<PuzzleHeroInfo> {
        const puzzleHero = await this.puzzleHeroesModel.findOne({
            event: eventId
        }).populate({
            path: 'tracks.puzzles.question',
            model: 'questions'
        }).exec();
        if (!puzzleHero) {
            throw new NotFoundException('No puzzle hero found');
        }

        return {
            open: PuzzleHeroesUtils.isAvailable(puzzleHero),
            scoreboardOpen: PuzzleHeroesUtils.isScoreboardAvailable(puzzleHero)
        };
    }

    public async createTrack(eventId: string, dto: CreateTrackDto): Promise<Tracks> {
        let puzzleHero = await this.findOne({
            event: eventId
        });
        if (!puzzleHero) {
            throw new NotFoundException('No puzzle hero found');
        }

        puzzleHero.tracks.push(dto as Tracks);
        puzzleHero = await puzzleHero.save();

        return puzzleHero.tracks.pop();
    }

    public async updateTrack(eventId: string, id: string, dto: UpdateTrackDto): Promise<void> {
        let puzzleHero = await this.findOne({
            event: eventId
        });
        if (!puzzleHero) {
            throw new NotFoundException('No puzzle hero found');
        }

        await this.puzzleHeroesModel.update({
                _id: puzzleHero._id,
                'tracks._id': id
            },
            {
                $set: {
                    'tracks.$.label': dto.label,
                    'tracks.$.type': dto.type,
                    'tracks.$.endDate': dto.endDate,
                    'tracks.$.releaseDate': dto.releaseDate
                }
            }
        ).exec();
    }

    public async createPuzzle(eventId: string, trackId: string, dto: CreatePuzzleDto): Promise<PuzzleGraphNodes> {
        let puzzleHero = await this.findOne({
            event: eventId
        });
        if (!puzzleHero) {
            throw new NotFoundException('No puzzle hero found');
        }

        const track = puzzleHero.tracks.find(x => x._id.equals(trackId));
        if (!track) {
            throw new NotFoundException('No track found');
        }

        if (dto.dependsOn) {
            const puzzle = track.puzzles.find(x => x._id.equals(dto.dependsOn));
            if (!puzzle) {
                throw new BadRequestException('Impossible deps');
            }
        }

        const question = await this.questionsModel.create({
            label: dto.label,
            description: dto.description,
            type: dto.type,
            validationType: dto.validationType,
            inputType: dto.inputType,
            answer: dto.answer,
            score: dto.score
        });

        track.puzzles.push({
            question: question._id,
            dependsOn: dto.dependsOn
        } as PuzzleGraphNodes);

        puzzleHero = await puzzleHero.save();

        return puzzleHero.tracks
            .find(x => x._id.equals(trackId))
            .puzzles.find(x => (x.question as mongoose.Types.ObjectId).equals(question._id));
    }


    public async updatePuzzle(eventId: string, trackId: string, puzzleId: string, dto: UpdateQuestionDto): Promise<void> {
        const puzzleHero = await this.findOne({
            event: eventId
        });
        if (!puzzleHero) {
            throw new NotFoundException('No puzzle hero found');
        }

        const track = puzzleHero.tracks.find(track => track._id.toHexString() === trackId);
        if (!track) {
            throw new NotFoundException('No track found');
        }

        const puzzle = track.puzzles.find(puzzle => puzzle._id.toHexString() === puzzleId);
        if (!puzzle) {
            throw new NotFoundException('No puzzle found');
        }

        return await this.questionsService.updateQuestion((puzzle.question as mongoose.Types.ObjectId).toHexString(), dto);
    }

    public async addTeamScore(eventId: string, teamId: string, score: number): Promise<void> {
        const lastScore = await this.getTeamLastScore(eventId, teamId);
        const newScore = lastScore + score;
        const newSerie = {
            name: new Date().toISOString(),
            value: newScore
        };
        await this.redisService.lpush(this.getTeamSeriesKey(eventId, teamId), JSON.stringify(newSerie));
        await this.redisService.zadd(this.getScoreboardKey(eventId), teamId, newScore);
        this.puzzleHeroesGateway.sendScoreboardUpdateMessage();
    }

    public async getScoreboard(eventId: string, user: UserModel): Promise<Score[]> {
        const puzzleHero = await this.findOne({
            event: eventId
        });
        if (!puzzleHero) {
            throw new NotFoundException('No puzzle hero found');
        }

        if (!PuzzleHeroesUtils.isScoreboardAvailable(puzzleHero) && user.role !== 'admin') {
            return;
        }

        const scores = await this.redisService.zrange(this.getScoreboardKey(eventId), 0, -1);
        return (await Promise.all(scores.map(async (s) => {
            try {
                const team = await this.teamsModel.findOne({
                    event: eventId,
                    _id: s.value
                });

                const school = await this.schoolsModel.findById(team.school);

                return {
                    teamId: team._id.toHexString(),
                    teamName: team.name,
                    schoolName: school.name,
                    score: s.score
                };
            } catch (e) {
                return null;
            }
        }))).filter(s => !!s);
    }

    public async getTeamsSeries(eventId: string, user: UserModel, teamsIds: string[]): Promise<TeamSeries[]> {
        const puzzleHero = await this.puzzleHeroesModel.findOne({
            event: eventId
        }).populate({
            path: 'answers.question',
            model: 'questions'
        }).exec();

        if (!puzzleHero) {
            throw new NotFoundException('No puzzle hero found');
        }

        if (!PuzzleHeroesUtils.isScoreboardAvailable(puzzleHero) && user.role !== 'admin') {
            return;
        }

        return await Promise.all(
            teamsIds.map(async (teamId: string) => {
                const team = await this.teamsModel.findById(teamId);
                const series = await this.getAllTeamSeries(eventId, teamId);
                return {
                    name: team.name,
                    series: series
                };
            })
        );
    }

    public async validateAnswer(answer: QuestionAnswerDto, puzzleId: string, eventId: string, email: string): Promise<void> {
        const puzzleHero = await this.findOne({
            event: eventId
        });
        if (!puzzleHero) {
            throw new NotFoundException('No puzzle hero found');
        }
        if (!PuzzleHeroesUtils.isAvailable(puzzleHero)) {
            throw new BadRequestException('Puzzle hero not available');
        }

        const track = puzzleHero.tracks.find(track => track.puzzles.findIndex(puzzle => puzzle._id.toHexString() === puzzleId) >= 0);
        if (!track) {
            throw new NotFoundException('No track found');
        }
        if (!TracksUtils.isAvailable(track)) {
            throw new BadRequestException('Track not available');
        }

        const puzzle = track.puzzles.find(puzzle => puzzle._id.toHexString() === puzzleId);
        if (!puzzle) {
            throw new NotFoundException('No puzzle found');
        }

        const teamId = await this.getTeamId(email, eventId);
        if (puzzle.dependsOn
            && !puzzleHero.answers.some(x => (x.teamId as mongoose.Types.ObjectId).equals(teamId)
                && (puzzle.dependsOn as mongoose.Types.ObjectId).equals(x.puzzle))) {
            throw new BadRequestException('The puzzle hero is locked');
        }
        if (puzzleHero.answers.some(x => (x.teamId as mongoose.Types.ObjectId).equals(teamId) && puzzle._id.equals(x.puzzle))) {
            throw new BadRequestException('Cannot answer puzzle twice');
        }

        const score = await this.questionsService.validateAnswer(answer, puzzle.question as string);

        puzzleHero.answers.push({
            puzzle: puzzle._id.toHexString(),
            teamId,
            timestamp: DateUtils.nowUTC()
        } as TracksAnswers);
        await puzzleHero.save();
        await this.addTeamScore(eventId, teamId, score);
    }

    public async start(eventId: string): Promise<void> {
        const teams = await this.teamsModel.find({
            event: eventId
        }).exec();

        await this.redisService.del(this.getScoreboardKey(eventId));

        for (const team of teams) {
            await this.redisService.scanDel(this.getTeamSeriesKey(eventId, team._id.toHexString()));
            await this.addTeamScore(eventId, team._id.toHexString(), 0);
        }
    }

    private async formatTrack(track: Tracks, puzzleHero: PuzzleHeroes, teamId: string, type?: string, admin = false): Promise<Tracks> {
        const puzzles = [];
        for (const puzzle of track.puzzles as PuzzleDefinition[]) {
            puzzle.completed = puzzleHero.answers.some(TracksAnswersUtils.find(puzzle, teamId));

            const question = puzzle.question as Questions;
            puzzle.label = question.label;
            puzzle.type = question.type;
            puzzle.inputType = question.inputType;
            puzzle.description = question.description;
            if (type && puzzle.type !== type) {
                continue;
            }
            delete puzzle.question;

            puzzles.push(puzzle);
            puzzle.locked = false;
            if (!puzzle.dependsOn || admin) {
                continue;
            }
            const depends = puzzleHero.answers.find(TracksAnswersUtils.findDepends(puzzle, teamId));
            if (!depends) {
                puzzle.locked = true;
                delete puzzle.description;
            }
        }
        track.puzzles = puzzles;
        return track;
    }

    private async getAllTeamSeries(eventId: string, teamId: string): Promise<Serie[]> {
        return (await this.redisService.lrange(this.getTeamSeriesKey(eventId, teamId), 0, -1))
            .map(s => JSON.parse(s) as Serie);
    }

    private getTeamLastScore(eventId: string, teamId: string): Promise<number> {
        return this.redisService.zscore(this.getScoreboardKey(eventId), teamId);
    }

    private getScoreboardKey(eventId: string): string {
        return `puzzle-hero:${eventId}:scoreboard`;
    }

    private getTeamSeriesKey(eventId: string, teamId: string): string {
        return `puzzle-hero:${eventId}:${teamId}:scores`;
    }

    private async getTeamId(email: string, eventId: string): Promise<string> {
        const attendee = await this.attendeesModel.findOne({
            email
        }).select('_id').exec();
        const team = await this.teamsModel.findOne({
            attendees: attendee ? attendee._id : null,
            event: eventId
        }).select('_id').exec();
        return team ? team._id.toHexString() : null;
    }
}
