import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as AdmZip from "adm-zip";
import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { UserModel } from "../../../models/user.model";
import { BaseService } from "../../../services/base.service";
import { DateUtils } from "../../../utils/date.utils";
import { ActivitiesService } from "../activities/activities.service";
import { Attendees } from "../attendees/attendees.model";
import { EventsService } from "../events/events.service";
import { QuestionAnswerDto } from "../questions/question-answer.dto";
import { UpdateQuestionDto } from "../questions/questions.dto";
import { Questions } from "../questions/questions.model";
import { QuestionsService } from "../questions/questions.service";
import { RegistrationsService } from "../registrations/registrations.service";
import { Teams } from "../teams/teams.model";
import {
    AuthCompetitionDto, CreateCompetitionDto, CreateCompetitionQuestionDto, CreateDirectorDto, UpdateCompetitionDto
} from "./competitions.dto";
import { Competitions } from "./competitions.model";
import { QuestionGraphNodes } from "./questions/question-graph-nodes.model";
import { Members } from "./members/members.model";
import { QuestionAnswers } from "./questions/question-answers.model";

export interface QuestionInfo extends Questions {
    isLocked: boolean;
    isAnswered: boolean;
}

export interface TeamCompetitionResult {
    _id: mongoose.Types.ObjectId;
    name: string;
    answers: string[];
}

@Injectable()
export class CompetitionsService extends BaseService<Competitions, Competitions> {
    constructor(@InjectModel("competitions") private readonly competitionsModel: Model<Competitions>,
                @InjectModel("attendees") private readonly attendeesModel: Model<Attendees>,
                @InjectModel("teams") private readonly teamsModel: Model<Teams>,
                @InjectModel("questions") private readonly questionsModel: Model<Questions>,
                private readonly activityService: ActivitiesService,
                private readonly registrationService: RegistrationsService,
                private readonly eventsService: EventsService,
                private readonly questionService: QuestionsService) {
        super(competitionsModel);
    }

    public async updateCompetition(eventId: string, competitionId: string, dto: UpdateCompetitionDto) {
        const event = await this.eventsService.findById(eventId);
        if (event.competitionResultsLocked) {
            throw new BadRequestException("Competition results are close");
        }

        await this.competitionsModel.update({
            _id: competitionId,
            event: eventId
        }, dto);
    }

    public async create(obj: Partial<CreateCompetitionDto & { event: string }>): Promise<Competitions> {
        if (obj.directors && obj.directors.length) {
            for (const director of obj.directors) {
                await this.validateDirector(director, obj.event);
            }
        }
        return await super.create(obj);
    }

    public async auth(eventId: string, competitionId: string, dto: AuthCompetitionDto, user: UserModel): Promise<void> {
        const competition = await this.competitionsModel.findOne({
            _id: competitionId,
            event: eventId
        }).populate({
            path: "activities",
            model: "activities"
        }).exec();
        if (!competition) {
            throw new NotFoundException();
        }

        if (!competition.onDashboard) {
            throw new BadRequestException("Competition not available");
        }

        if (!competition.isLive) {
            throw new BadRequestException("Competition must me live");
        }

        if (competition.password !== dto.password) {
            throw new UnauthorizedException();
        }

        const attendee = await this.attendeesModel.findOne({
            email: user.username
        }).select("_id").exec();
        const teamId = await this.getTeamId(attendee, eventId);
        if (!teamId) {
            throw new BadRequestException("Attendee must be in a team");
        }

        const member = competition.members.find(x => (x.team as mongoose.Types.ObjectId).equals(teamId));
        if (!member) {
            return await this.competitionsModel.updateOne({
                _id: competitionId
            }, {
                $push: {
                    members: {
                        team: teamId,
                        attendees: [attendee._id]
                    } as Members
                }
            }).exec();
        }
        if (member.attendees.length >= competition.maxMembers) {
            throw new BadRequestException("Cannot add more member for competition");
        }

        if (member.attendees.findIndex(x => (x as mongoose.Types.ObjectId).equals(attendee._id)) >= 0) {
            return;
        }
        await this.competitionsModel.updateOne({
            _id: competitionId,
            "members.team": teamId
        }, {
            $push: {
                "members.$.attendees": attendee._id
            }
        }).exec();
    }

    public async createQuestion(eventId: string, competitionId: string, dto: CreateCompetitionQuestionDto): Promise<QuestionGraphNodes> {
        let competition = await this.competitionsModel.findOne({
            _id: competitionId,
            event: eventId
        }).exec();
        if (!competition) {
            throw new NotFoundException();
        }

        if (dto.dependsOn) {
            const node = competition.questions.find(x => x._id.equals(dto.dependsOn));
            if (!node) {
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
            score: dto.score,
            option: dto.option
        });

        competition.questions.push({
            question: question._id,
            dependsOn: dto.dependsOn
        } as QuestionGraphNodes);

        competition = await competition.save();

        return competition.questions.find(x => (x.question as mongoose.Types.ObjectId).equals(question._id));
    }

    public async validateQuestion(eventId: string,
                                  competitionId: string,
                                  questionId: string,
                                  dto: QuestionAnswerDto,
                                  user: UserModel): Promise<void> {
        const competition = await this.competitionsModel.findOne({
            _id: competitionId,
            event: eventId
        }).populate([
            {
                path: "activities",
                model: "activities",
                select: {
                    attendees: false,
                    subscribers: false
                }
            },
            {
                path: "questions.question",
                model: "questions"
            }
        ]).exec();
        if (!competition) {
            throw new NotFoundException();
        }

        if (!competition.isLive) {
            throw new BadRequestException("Competition not live");
        }

        const question = competition.questions.find(x => (x.question as Questions)._id.equals(questionId));
        if (!question) {
            throw new BadRequestException("No question found");
        }

        const teamId = await this.getTeamId(user.username, eventId);
        if (this.isQuestionLocked(competition, question, teamId)) {
            throw new BadRequestException("Question locked");
        }

        await this.questionService.validateAnswer({
            ...dto,
            teamId
        }, question.question as string);


        if (this.isQuestionAnswered(competition, question, teamId)) {
            await this.competitionsModel.updateOne({
                _id: competitionId,
                event: eventId,
                answers: {
                    _id: question._id
                } as QuestionAnswers
            }, {
                $set: {
                    "answer.$.timestamp": DateUtils.nowUTC()
                }
            }).exec();
        } else {
            await this.competitionsModel.updateOne({
                _id: competitionId,
                event: eventId
            }, {
                $push: {
                    answers: {
                        question: (question.question as Questions)._id,
                        teamId,
                        timestamp: DateUtils.nowUTC()
                    } as QuestionAnswers
                }
            }).exec();
        }
    }

    public async updateQuestion(eventId: string, competitionId: string, questionId: string, dto: UpdateQuestionDto): Promise<void> {
        const competition = await this.competitionsModel.findOne({
            _id: competitionId,
            event: eventId
        }).populate([
            {
                path: "questions.question",
                model: "questions"
            }
        ]).exec();
        if (!competition) {
            throw new NotFoundException();
        }

        const question = competition.questions.find(x => (x.question as Questions)._id.equals(questionId));
        if (!question) {
            throw new BadRequestException("No question found");
        }

        await this.questionsModel.updateOne({
            _id: (question.question as Questions)._id
        }, dto as Questions).exec();
    }

    public async removeQuestion(eventId: string, competitionId: string, questionId: string): Promise<void> {
        const competition = await this.competitionsModel.findOne({
            _id: competitionId,
            event: eventId
        }).exec();
        if (!competition) {
            throw new NotFoundException();
        }

        const question = competition.questions.find(x => x._id.equals(questionId));
        if (!question) {
            throw new BadRequestException("No question found");
        }

        await this.questionsModel.deleteOne({
            _id: question.question
        }).exec();
        competition.questions.splice(competition.questions.findIndex(x => x._id.equals(questionId)), 1);
        competition.questions.forEach(x => {
            if (x.dependsOn && (x.dependsOn as mongoose.Types.ObjectId).equals(questionId)) {
                x.dependsOn = null;
            }
        });
        await competition.save();
    }

    public async getQuestionResult(eventId: string, competitionId: string, questionId: string): Promise<Buffer> {
        const competition = await this.competitionsModel.findOne({
            _id: competitionId,
            event: eventId
        }).exec();
        if (!competition) {
            throw new NotFoundException();
        }

        const question = competition.questions.find(x => x._id.equals(questionId));
        if (!question) {
            throw new BadRequestException("No question found");
        }

        let files = await this.questionService.getUplodedFile(question.question as string);
        const teams = await this.teamsModel.find({
            event: eventId
        }).select("name").exec();
        const zip = new AdmZip();
        for (const key in files) {
            if (!files.hasOwnProperty(key)) {
                continue;
            }

            const teamId = key.split("-");
            if (teamId.length < 2) {
                continue;
            }
            const team = teams.find(x => x._id.equals(teamId[1].split(".")[0]));
            if (!team) {
                continue;
            }

            const file = teamId[1];
            const ext = file.slice(file.indexOf("."), file.length);
            zip.addFile(`${team.name}${ext}`, files[key]);
        }

        return zip.toBuffer();
    }

    public async createDirector(eventId: string, competitionId: string, dto: CreateDirectorDto): Promise<Attendees> {
        const competition = await this.competitionsModel.findOne({
            _id: competitionId,
            event: eventId
        }).exec();
        if (!competition) {
            throw new NotFoundException();
        }

        const attendee = await this.registrationService.registerRole({
            ...dto,
            role: "director"
        }, eventId);

        competition.directors.push(attendee._id);
        await competition.save();

        return attendee;
    }

    public async addDirector(eventId: string, competitionId: string, attendeeId: string): Promise<void> {
        const competition = await this.competitionsModel.findOne({
            _id: competitionId,
            event: eventId
        }).exec();
        if (!competition) {
            throw new NotFoundException();
        }

        const attendee = await this.attendeesModel.findOne({
            _id: attendeeId
        });
        if (!attendee) {
            throw new NotFoundException("No attendee found");
        }

        const role = await this.eventsService.getAttendeeRole(eventId, attendeeId);
        if (role && role !== "director") {
            throw new BadRequestException("Attendee must be a director");
        }

        if (!role) {
            await this.eventsService.addAttendee(eventId, attendee, "director");
        }

        if (competition.directors.findIndex(x => (x as mongoose.Types.ObjectId).equals(attendeeId)) >= 0) {
            throw new BadRequestException("Attendee is already a director for this competition");
        }

        await this.competitionsModel.updateOne({
            _id: competitionId
        }, {
            $push: {
                directors: attendeeId
            }
        }).exec();
    }

    public async removeDirector(eventId: string, competitionId: string, attendeeId: string): Promise<void> {
        const competition = await this.competitionsModel.findOne({
            _id: competitionId,
            event: eventId
        }).exec();
        if (!competition) {
            throw new NotFoundException();
        }

        const attendee = await this.attendeesModel.findOne({
            _id: attendeeId
        });
        if (!attendee) {
            throw new NotFoundException("No attendee found");
        }

        if (competition.directors.findIndex(x => (x as mongoose.Types.ObjectId).equals(attendeeId)) < 0) {
            throw new BadRequestException("Attendee isn't a director for this competition");
        }

        await this.competitionsModel.updateOne({
            _id: competitionId
        }, {
            $pull: {
                directors: attendeeId
            }
        }).exec();
    }

    public async subscribe(eventId: string, competitionId: string, user: UserModel): Promise<void> {
        const competition = await this.competitionsModel.findOne({
            _id: competitionId,
            event: eventId
        }).exec();
        if (!competition) {
            throw new NotFoundException();
        }

        const attendee = await this.attendeesModel.findOne({
            email: user.username
        });
        if (!attendee) {
            throw new NotFoundException("No attendee found");
        }

        for (const activity of competition.activities) {
            await this.activityService.subscribeAttendee(activity as string, attendee._id.toHexString());
        }
    }

    public async unsubscribe(eventId: string, competitionId: string, user: UserModel): Promise<void> {
        const competition = await this.competitionsModel.findOne({
            _id: competitionId,
            event: eventId
        }).exec();
        if (!competition) {
            throw new NotFoundException();
        }

        const attendee = await this.attendeesModel.findOne({
            email: user.username
        });
        if (!attendee) {
            throw new NotFoundException("No attendee found");
        }

        for (const activity of competition.activities) {
            await this.activityService.unsubscribeAttendee(activity as string, attendee._id.toHexString());
        }
    }

    public async getById(eventId: string, competitionId: string, user: UserModel): Promise<Competitions> {
        const competition = await this.competitionsModel.findOne({
            _id: competitionId,
            event: eventId
        }).populate([
            {
                path: "activities",
                model: "activities",
                select: {
                    attendees: false,
                    subscribers: false
                }
            },
            {
                path: "questions.question",
                model: "questions"
            },
            {
                path: "directors",
                model: "attendees",
                select: {
                    notifications: false
                }
            }
        ]).exec();

        if (!competition) {
            throw new NotFoundException();
        }

        if (user.role.endsWith("admin") || user.role === "director") {
            return competition;
        }

        if (!competition.isLive) {
            throw new BadRequestException("Competition is not live.");
        }

        const attendee = await this.attendeesModel.findOne({
            email: user.username
        });
        const c = competition.toJSON();
        const isMember = c.members.some(x => x.attendees.some(y => (y as mongoose.Types.ObjectId).equals(attendee._id)));

        if (!isMember) {
            throw new ForbiddenException();
        }

        c.questions = await this.formatQuestions(c, attendee, eventId);

        delete c.directors;
        delete c.answers;
        delete c.password;
        delete c.members;
        delete c.results;

        return c;
    }

    public async getResult(eventId: string, competitionId: string): Promise<TeamCompetitionResult[]> {
        const competition = await this.competitionsModel.findOne({
            _id: competitionId,
            event: eventId
        }).select(["questions", "answers"]).exec();
        if (!competition) {
            throw new NotFoundException();
        }

        const result: TeamCompetitionResult[] = [];
        const teams = await this.teamsModel.find({
            event: eventId
        }).select(["_id", "name"]).exec();
        for (const team of teams) {
            result.push({
                _id: team._id,
                name: team.name,
                answers: competition.answers.filter(x => team._id.equals(x.teamId as string)).map(x => x.question as string)
            });
        }

        return result;
    }

    public async getFilteredResult(eventId: string, competitionId: string): Promise<TeamCompetitionResult[]> {
        let results = await this.getResult(eventId, competitionId);
        let teams = await this.teamsModel.find({ event: eventId }).exec();
        let teamsIdToRemove = teams.filter((team: Teams) => {
            return team.showOnScoreboard === false;
        }).map(t => t._id.toHexString());
        return results.filter((teamCompetitionResult: TeamCompetitionResult) => {
            return teamsIdToRemove.indexOf(teamCompetitionResult._id.toHexString()) === -1;
        });
    }

    private async formatQuestions(competition: Competitions, attendee: Attendees, eventId: string): Promise<QuestionInfo[]> {
        const questions: QuestionInfo[] = [];
        const teamId = await this.getTeamId(attendee, eventId);
        for (const question of competition.questions) {
            questions.push({
                ...question.question as Questions,
                isLocked: this.isQuestionLocked(competition, question, teamId),
                isAnswered: this.isQuestionAnswered(competition, question, teamId)
            } as QuestionInfo);
        }
        return questions;
    }

    private isQuestionAnswered(competition: Competitions, question: QuestionGraphNodes, teamId: string) {
        return competition.answers.some(x => (x.teamId as mongoose.Types.ObjectId).equals(teamId)
            && (x.question as mongoose.Types.ObjectId).equals((question.question as Questions)._id));
    }

    private isQuestionLocked(competition: Competitions, question: QuestionGraphNodes, teamId: string) {
        if (!question.dependsOn) {
            return false;
        }

        const depends = competition.questions.find(x => x._id.equals(question.dependsOn as string));
        if (!depends) {
            return false;
        }

        return this.isQuestionAnswered(competition, depends, teamId);
    }

    private async getTeamId(attendee: Attendees | string, eventId: string): Promise<string> {
        if (typeof attendee === "string") {
            attendee = await this.attendeesModel.findOne({
                email: attendee
            }).select("_id").exec();
        }
        const team = await this.teamsModel.findOne({
            attendees: attendee ? attendee._id : null,
            event: eventId
        }).select("_id").exec();
        return team ? team._id.toHexString() : null;
    }

    private async validateDirector(attendeeId: string, eventId: string): Promise<void> {
        const attendee = await this.attendeesModel.findOne({
            _id: attendeeId
        });
        if (!attendee) {
            throw new NotFoundException("No attendee found");
        }

        const role = await this.eventsService.getAttendeeRole(eventId, attendeeId);
        if (role && role !== "director") {
            throw new BadRequestException("Attendee must be a director");
        }

        if (!role) {
            await this.eventsService.addAttendee(eventId, attendee, "director");
        }
    }
}
