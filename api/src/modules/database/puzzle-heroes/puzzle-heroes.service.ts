import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { UserModel } from "../../../models/user.model";
import { BaseService } from "../../../services/base.service";
import { DateUtils } from "../../../utils/date.utils";
import { RedisService } from "../../redis/redis.service";
import { Attendees } from "../attendees/attendees.model";
import { QuestionAnswerDto } from "../questions/question-answer.dto";
import { UpdateQuestionDto } from "../questions/questions.dto";
import { Questions } from "../questions/questions.model";
import { QuestionsService } from "../questions/questions.service";
import { Schools } from "../schools/schools.model";
import { Sponsors } from "../sponsors/sponsors.model";
import { Teams } from "../teams/teams.model";
import { PuzzleGraphNodes } from "./puzzle-graph-nodes/puzzle-graph.nodes.model";
import { CreatePuzzleDto, CreateTrackDto, UpdatePuzzleHeroDto, UpdateTrackDto } from "./puzzle-heroes.dto";
import { PuzzleHeroesGateway } from "./puzzle-heroes.gateway";
import { PuzzleHeroes, PuzzleHeroesUtils } from "./puzzle-heroes.model";
import { Score } from "./scoreboard/score.model";
import { Serie, TeamSeries } from "./scoreboard/team-series.model";
import { TracksAnswers, TracksAnswersUtils } from "./tracks/tracks-answers.model";
import { Tracks, TracksUtils } from "./tracks/tracks.model";
import { StorageService } from "@polyhx/nest-services";

export interface PuzzleDefinition extends PuzzleGraphNodes {
    completed: boolean;
    validated: boolean;
    refused: boolean;
    locked: boolean;
    label: string;
    description: { [lang: string]: string };
    type: string;
    inputType: string;
    score: number;
    answersCount: number;
}

export interface PuzzleHeroInfo {
    open: boolean;
    scoreboardOpen: boolean;
}

@Injectable()
export class PuzzleHeroesService extends BaseService<PuzzleHeroes, PuzzleHeroes> {
    constructor(@InjectModel("puzzle-heroes") private readonly puzzleHeroesModel: Model<PuzzleHeroes>,
                @InjectModel("questions") private readonly questionsModel: Model<Questions>,
                @InjectModel("attendees") private readonly attendeesModel: Model<Attendees>,
                @InjectModel("teams") private readonly teamsModel: Model<Teams>,
                @InjectModel("schools") private readonly schoolsModel: Model<Schools>,
                private questionsService: QuestionsService,
                private puzzleHeroesGateway: PuzzleHeroesGateway,
                private redisService: RedisService,
                private storageService: StorageService) {
        super(puzzleHeroesModel);
    }

    public async updatePuzzleHero(eventId: string, dto: UpdatePuzzleHeroDto) {
        const puzzleHero = await this.puzzleHeroesModel.findOne({
            event: eventId
        }).exec();

        if (!puzzleHero) {
            throw new NotFoundException("No puzzle hero found");
        }

        await this.puzzleHeroesModel.update({ _id: puzzleHero._id }, dto).exec();
    }

    public async getByEvent(eventId: string, user: UserModel, type: string): Promise<PuzzleHeroes> {
        const puzzleHero = await this.puzzleHeroesModel.findOne({
            event: eventId
        }).populate({
            path: "tracks.puzzles.question",
            model: "questions"
        }).populate({
            path: "answers.teamId",
            model: "teams"
        }).lean().exec();
        if (!puzzleHero) {
            throw new NotFoundException("No puzzle hero found");
        }

        switch (user.role) {
            case "captain":
            case "attendee":
            case "godparent":
                return this.getPuzzleHeroForAttendee(eventId, user, type, puzzleHero);
            case "admin":
            case "super-admin":
                return this.formatPuzzleHeroForAdmin(puzzleHero);
        }
    }

    private formatPuzzleHeroForAdmin(puzzleHero: PuzzleHeroes): any {
        for (const track of puzzleHero.tracks) {
            track.puzzles.forEach((p: any) => {
                p.answers = puzzleHero.answers.filter((a) => p._id.equals(a.puzzle));
            });
        }
        return puzzleHero;
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
            const t = await this.formatTrack(track, puzzleHero, teamId, type);
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
            path: "tracks.puzzles.question",
            model: "questions"
        }).exec();
        if (!puzzleHero) {
            throw new NotFoundException("No puzzle hero found");
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
            throw new NotFoundException("No puzzle hero found");
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
            throw new NotFoundException("No puzzle hero found");
        }

        await this.puzzleHeroesModel.update({
                _id: puzzleHero._id,
                "tracks._id": id
            },
            {
                $set: {
                    "tracks.$.label": dto.label,
                    "tracks.$.type": dto.type,
                    "tracks.$.endDate": dto.endDate,
                    "tracks.$.releaseDate": dto.releaseDate
                }
            }
        ).exec();
    }

    public async createPuzzle(eventId: string, trackId: string, dto: CreatePuzzleDto): Promise<PuzzleGraphNodes> {
        let puzzleHero = await this.findOne({
            event: eventId
        });
        if (!puzzleHero) {
            throw new NotFoundException("No puzzle hero found");
        }

        const track = puzzleHero.tracks.find(x => x._id.equals(trackId));
        if (!track) {
            throw new NotFoundException("No track found");
        }

        if (dto.dependsOn) {
            const puzzle = track.puzzles.find(x => x._id.equals(dto.dependsOn));
            if (!puzzle) {
                throw new BadRequestException("Impossible deps");
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
            throw new NotFoundException("No puzzle hero found");
        }

        const track = puzzleHero.tracks.find(track => track._id.toHexString() === trackId);
        if (!track) {
            throw new NotFoundException("No track found");
        }

        const puzzle = track.puzzles.find(puzzle => puzzle._id.toHexString() === puzzleId);
        if (!puzzle) {
            throw new NotFoundException("No puzzle found");
        }

        return await this.questionsService.updateQuestion((puzzle.question as mongoose.Types.ObjectId).toHexString(), dto);
    }

    public async addTeamScore(eventId: string, teamId: string, score: number, date: string): Promise<void> {
        const lastScore = await this.getTeamLastScore(eventId, teamId);
        const newScore = lastScore + score;
        const newSerie = {
            name: date,
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
            throw new NotFoundException("No puzzle hero found");
        }

        if (!PuzzleHeroesUtils.isScoreboardAvailable(puzzleHero) && !user.role.endsWith("admin")) {
            return;
        }

        const scores = await this.redisService.zrange(this.getScoreboardKey(eventId), 0, -1);
        return (await Promise.all(scores.map(async (s) => {
            try {
                const team = await this.teamsModel.findOne({
                    event: eventId,
                    _id: s.value
                }).populate([{
                    model: "schools",
                    path: "school",
                    select: ["name"]
                }, {
                    model: "sponsors",
                    path: "sponsor",
                    select: ["name"]
                }]).exec();

                if (user.role === "sponsor" && !team.sponsor) {
                    return null;
                } else if (!user.role.endsWith("admin") && !team.school) {
                    return null;
                }

                return {
                    teamId: team._id.toHexString(),
                    teamName: team.name,
                    schoolName: team.school ? (team.school as Schools).name : (team.sponsor as Sponsors).name,
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
            path: "answers.question",
            model: "questions"
        }).exec();

        if (!puzzleHero) {
            throw new NotFoundException("No puzzle hero found");
        }

        if (!PuzzleHeroesUtils.isScoreboardAvailable(puzzleHero) && user.role !== "admin") {
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
        console.log("validate answer is called lol no shit");
        const puzzleHero = await this.findOne({
            event: eventId
        });
        if (!puzzleHero) {
            throw new NotFoundException("No puzzle hero found");
        }
        if (!PuzzleHeroesUtils.isAvailable(puzzleHero)) {
            throw new BadRequestException("Puzzle hero not available");
        }

        const track = puzzleHero.tracks.find(track => track.puzzles.findIndex(puzzle => puzzle._id.toHexString() === puzzleId) >= 0);
        if (!track) {
            throw new NotFoundException("No track found");
        }
        if (!TracksUtils.isAvailable(track)) {
            throw new BadRequestException("Track not available");
        }

        const puzzle = track.puzzles.find(puzzle => puzzle._id.toHexString() === puzzleId);
        if (!puzzle) {
            throw new NotFoundException("No puzzle found");
        }

        const teamId = await this.getTeamId(email, eventId);
        if (puzzle.dependsOn
            && !puzzleHero.answers.some(x => (x.teamId as mongoose.Types.ObjectId).equals(teamId)
                && (puzzle.dependsOn as mongoose.Types.ObjectId).equals(x.puzzle))) {
            throw new BadRequestException("The puzzle hero is locked");
        }
        if (puzzleHero.answers.some(x =>
            (x.teamId as mongoose.Types.ObjectId).equals(teamId) && puzzle._id.equals(x.puzzle) && !x.refused)
        ) {
            throw new BadRequestException("Cannot answer puzzle twice");
        }

        const [score, validated, res] = await this.questionsService.validateAnswer({
            ...answer,
            teamId
        }, puzzle.question as string);

        const oldAnswer = puzzleHero.answers.find(x =>
            (x.teamId as mongoose.Types.ObjectId).equals(teamId) && puzzle._id.equals(x.puzzle)
        );
        if (oldAnswer) {
            oldAnswer.refused = false;
            oldAnswer.validated = false;
            oldAnswer.timestamp =  DateUtils.nowUTC();
            oldAnswer.file = res !== answer.answer ? res : undefined;
        } else {
            puzzleHero.answers.push({
                puzzle: puzzle._id.toHexString(),
                teamId,
                timestamp: DateUtils.nowUTC(),
                validated: validated,
                file: res !== answer.answer ? res : undefined
            } as TracksAnswers);
        }
        await puzzleHero.save();
        if (validated) {
            await this.addTeamScore(eventId, teamId, score, new Date().toISOString());
        }
    }

    public async start(eventId: string, teams?: Teams[], date?: string): Promise<void> {
        if (!teams) {
            teams = await this.teamsModel.find({
                event: eventId
            }).exec();
        }

        await this.redisService.del(this.getScoreboardKey(eventId));

        date = date ? date : new Date().toISOString();
        for (const team of teams) {
            await this.redisService.scanDel(this.getTeamSeriesKey(eventId, team._id.toHexString()));
            await this.addTeamScore(eventId, team._id.toHexString(), 0, date);
        }
    }

    public async populateScoreboard(eventId: string): Promise<void> {
        const puzzleHero = await this.findOne({
            event: eventId
        });
        if (!puzzleHero) {
            throw new NotFoundException("No puzzle hero found");
        }

        const teams = await this.teamsModel.find({
            event: eventId
        }).exec();
        await this.start(eventId, teams, (puzzleHero.releaseDate as Date).toISOString());

        for (const team of teams) {
            const answers = puzzleHero.answers.filter(value => team._id.equals(value.teamId as string));
            for (const answer of answers) {
                const track = puzzleHero.tracks.find(track => track
                    .puzzles.findIndex(puzzle => puzzle._id.equals(answer.puzzle)) >= 0);
                if (!track) {
                    continue;
                }
                const puzzle = track.puzzles.find(puzzle => puzzle._id.equals(answer.puzzle));
                if (!puzzle) {
                    continue;
                }
                const question = await this.questionsModel.findOne({
                    _id: puzzle.question
                }).exec();
                await this.addTeamScore(eventId, team._id.toHexString(), question.score, (answer.timestamp as Date).toISOString());
            }
        }
    }

    public async getAnswerFile(eventId: string, puzzleId: string, answerId: string): Promise<{ type: string, url: string }> {
        const puzzleHero = await this.findOne({
            event: eventId
        });
        if (!puzzleHero) {
            throw new NotFoundException("No puzzle hero found");
        }

        const track = puzzleHero.tracks.find(track => track.puzzles.findIndex(x => x._id.equals(puzzleId)) >= 0);
        if (!track) {
            throw new NotFoundException("No track found");
        }

        const puzzle = track.puzzles.find(puzzle => puzzle._id.equals(puzzleId));
        if (!puzzle) {
            throw new NotFoundException("No puzzle found");
        }

        const answer = puzzleHero.answers.find(answer =>
            (answer.puzzle as mongoose.Types.ObjectId).equals(puzzleId) &&
            answer._id.equals(answerId)
        );
        if (!answer || !answer.file) {
            throw new NotFoundException("No answer found");
        }

        const metadata = await this.storageService.getMetadata(answer.file);
        return {
            type: metadata.mimeType,
            url: await this.storageService.getDownloadUrl(answer.file)
        };
    }

    public async manualValidation(eventId: string, puzzleId: string, answerId: string): Promise<void> {
        const puzzleHero = await this.findOne({
            event: eventId
        });
        if (!puzzleHero) {
            throw new NotFoundException("No puzzle hero found");
        }

        const track = puzzleHero.tracks.find(track => track.puzzles.findIndex(x => x._id.equals(puzzleId)) >= 0);
        if (!track) {
            throw new NotFoundException("No track found");
        }

        const puzzle = track.puzzles.find(puzzle => puzzle._id.equals(puzzleId));
        if (!puzzle) {
            throw new NotFoundException("No puzzle found");
        }

        const answer = puzzleHero.answers.find(answer =>
            (answer.puzzle as mongoose.Types.ObjectId).equals(puzzleId) &&
            answer._id.equals(answerId)
        );
        if (!answer) {
            throw new NotFoundException("No answer found");
        }
        answer.validated = true;
        await puzzleHero.save();

        const question = await this.questionsModel.findById(puzzle.question);
        await this.addTeamScore(eventId, answer.teamId as string, question?.score, new Date().toISOString());
    }

    public async refuseValidation(eventId: string, puzzleId: string, answerId: string): Promise<void> {
        const puzzleHero = await this.findOne({
            event: eventId
        });
        if (!puzzleHero) {
            throw new NotFoundException("No puzzle hero found");
        }

        const track = puzzleHero.tracks.find(track => track.puzzles.findIndex(x => x._id.equals(puzzleId)) >= 0);
        if (!track) {
            throw new NotFoundException("No track found");
        }

        const puzzle = track.puzzles.find(puzzle => puzzle._id.equals(puzzleId));
        if (!puzzle) {
            throw new NotFoundException("No puzzle found");
        }

        const answer = puzzleHero.answers.find(answer =>
            (answer.puzzle as mongoose.Types.ObjectId).equals(puzzleId) &&
            answer._id.equals(answerId)
        );
        if (!answer) {
            throw new NotFoundException("No answer found");
        }
        answer.validated = false;
        answer.refused = true;
        await puzzleHero.save();
    }

    private async formatTrack(track: Tracks, puzzleHero: PuzzleHeroes, teamId: string, type?: string): Promise<Tracks> {
        const puzzles = [];
        for (const puzzle of track.puzzles as PuzzleDefinition[]) {
            const answer = puzzleHero.answers.find(TracksAnswersUtils.find(puzzle, teamId));
            puzzle.completed = !!answer;
            puzzle.validated = answer?.validated ?? puzzle.completed;
            puzzle.refused = answer?.refused;
            puzzle.answersCount = puzzleHero.answers.filter(TracksAnswersUtils.findById(puzzle)).length;

            const question = puzzle.question as Questions;
            puzzle.label = question.label;
            puzzle.type = question.type;
            puzzle.inputType = question.inputType;
            puzzle.description = question.description;
            puzzle.score = question.score;
            if (type && puzzle.type !== type) {
                continue;
            }
            delete puzzle.question;

            puzzles.push(puzzle);
            puzzle.locked = false;
            if (!puzzle.dependsOn) {
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
        }).select("_id").exec();
        const team = await this.teamsModel.findOne({
            attendees: attendee ? attendee._id : null,
            event: eventId
        }).select("_id").exec();
        return team ? team._id.toHexString() : null;
    }
}
