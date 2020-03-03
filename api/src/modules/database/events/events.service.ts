import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { StorageService } from "@polyhx/nest-services";
import * as AdmZip from "adm-zip";
import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { isNullOrUndefined } from "util";
import { UserModel } from "../../../models/user.model";
import { BaseService } from "../../../services/base.service";
import { EmailTemplateService, Template } from "../../email/email-template.service";
import { CreateActivityDto } from "../activities/activities.dto";
import { Activities } from "../activities/activities.model";
import { ActivitiesService } from "../activities/activities.service";
import { UpdateAttendeeDto } from "../attendees/attendees.dto";
import { AttendeeNotifications, Attendees } from "../attendees/attendees.model";
import { AttendeesService } from "../attendees/attendees.service";
import { Competitions, CompetitionsUtils } from "../competitions/competitions.model";
import { Notifications } from "../notifications/notifications.model";
import { NotificationsService } from "../notifications/notifications.service";
import { PuzzleHeroesService } from "../puzzle-heroes/puzzle-heroes.service";
import { Schools } from "../schools/schools.model";
import { Teams } from "../teams/teams.model";
import { AddSponsorDto, CreateEventDto, SendNotificationDto, UpdateTemplateDto } from "./events.dto";
import { AttendeeAlreadyRegisteredException, EventNotFoundException, UserNotAttendeeException } from "./events.exception";
import { DefaultGuide, Events, EventSponsorDetails, EventTemplateTypes } from "./events.model";
import { AddGuideSectionDto, GuideDto } from "./guide.dto";

export interface EventScore {
    overall: TeamScore[];
    competitions: CompetitionScore[];
}

export interface TeamScore {
    teamId: string;
    teamName: string;
    teamSchoolName: string;
    score: number;
}

export interface CompetitionScore {
    _id: string;
    name: object;
    results: TeamScore[];
    weight: Number;
}

@Injectable()
export class EventsService extends BaseService<Events, CreateEventDto> {
    constructor(@InjectModel("events") private readonly eventsModel: Model<Events>,
                @InjectModel("teams") private readonly teamsModel: Model<Teams>,
                @InjectModel("competitions") private readonly competitionsModel: Model<Competitions>,
                private readonly attendeeService: AttendeesService,
                private readonly activitiesService: ActivitiesService,
                private readonly storageService: StorageService,
                private readonly notificationService: NotificationsService,
                private readonly puzzleHeroesService: PuzzleHeroesService,
                private readonly templateService: EmailTemplateService) {
        super(eventsModel);
    }

    public async create(createEventDto: CreateEventDto): Promise<Events> {
        const event = await super.create(createEventDto);
        await this.puzzleHeroesService.create({
            event: event._id,
            tracks: [],
            answers: [],
            open: false,
            releaseDate: createEventDto.beginDate,
            endDate: createEventDto.endDate,
            scoreboardEndDate: createEventDto.endDate
        });
        return event;
    }

    public async getEventList(user: UserModel): Promise<Events[]> {
        let condition = {};
        if (user.role !== "super-admin") {
            const attendee = await this.attendeeService.findOne({
                email: user.username
            });
            condition = {
                "attendees.attendee": attendee._id
            };
        }

        return await this.eventsModel.find(condition).select({
            name: true,
            imageUrl: true,
            beginDate: true,
            endDate: true,
            details: true,
            coverUrl: true,
            attendees: true,
            teamEditLocked: true,
            teamEditLockDate: true,
            flashoutBeginDate: true,
            flashoutEndDate: true,
            attendee: true,
            primaryColor: true,
            competitionResultsLocked: true,
            disclaimer: true,
            publicTransportation: true,
            askDietaryRestriction: true
        }).exec();
    }

    public async addAttendee(eventId: string, userIdOrAttendee: string | Attendees, role: string): Promise<Events> {
        let attendee: Attendees;
        if (typeof userIdOrAttendee === "string") {
            attendee = await this.attendeeService.findOne({
                userId: userIdOrAttendee
            });
        } else {
            attendee = userIdOrAttendee;
        }

        if (!attendee) {
            throw new UserNotAttendeeException();
        }

        const attendeeAlreadyRegistered = (await this.eventsModel.countDocuments({
            _id: eventId,
            "attendees.attendee": attendee._id
        }).exec()) > 0;

        if (attendeeAlreadyRegistered) {
            throw new AttendeeAlreadyRegisteredException();
        }

        let registered = false;
        if (role === "admin" || role === "volunteer" || role === "director" || role === "sponsor") {
            registered = true;
        }

        return this.eventsModel.updateOne({
            _id: eventId
        }, {
            $push: {
                attendees: {
                    attendee: attendee._id,
                    role: role,
                    registered
                }
            }
        }).exec();
    }

    public async hasAttendeeForUser(eventId: string, userId: string): Promise<boolean> {
        const attendee = await this.attendeeService.findOne({ userId });

        if (!attendee) {
            throw new UserNotAttendeeException();
        }

        return this.hasAttendee(eventId, attendee._id);
    }

    public async hasAttendee(eventId: string, attendeeId: string): Promise<boolean> {
        const occurrencesOfAttendee = await this.eventsModel.count({
            _id: eventId,
            "attendees.attendee": attendeeId
        }).exec();

        return occurrencesOfAttendee > 0;
    }

    public async createActivity(id: string, dto: CreateActivityDto): Promise<Events> {
        const event = await this.findById(id);
        if (!event) {
            throw new EventNotFoundException();
        }

        const activity = await this.activitiesService.create(dto);
        event.activities.push(activity._id);
        return await event.save();
    }

    public async getActivities(eventId: string, user: UserModel): Promise<Activities[]> {
        const event = await this.findById(eventId);
        if (!event) {
            throw new EventNotFoundException();
        }

        return await this.activitiesService.findByIds(event.activities as string[], user);
    }

    public async getSponsors(eventId: string): Promise<{ [tier: string]: EventSponsorDetails[] }> {
        const event = await this.eventsModel.findOne({
            _id: eventId
        }).select("sponsors").populate("sponsors.sponsor").exec();
        const sponsors = event.sponsors;
        const result: { [tier: string]: EventSponsorDetails[] } = {};

        for (const sponsor of sponsors) {
            if (!result[sponsor.tier]) {
                result[sponsor.tier] = [];
            }
            result[sponsor.tier].push({
                ...(sponsor.sponsor as any)._doc,
                web: sponsor.web,
                mobile: sponsor.mobile
            } as EventSponsorDetails);
        }

        return result;
    }

    public async addSponsor(eventId: string, dto: AddSponsorDto): Promise<Events> {
        return await this.eventsModel.updateOne({
            _id: eventId
        }, {
            $push: {
                sponsors: dto
            }
        }).exec();
    }

    public async createNotification(id: string, message: SendNotificationDto) {
        const event = await this.eventsModel.findOne({
            _id: id
        }).exec();
        const ids = event.attendees.map(x => x.attendee);

        await this.notificationService.create({
            ...message,
            event: id,
            attendees: ids as string[],
            data: {
                type: "event",
                event: JSON.stringify({
                    _id: event._id,
                    name: event.name
                }),
                dynamicLink: `event/${id}`
            }
        });
    }

    public async getNotifications(id: string, email: string, seen?: boolean): Promise<AttendeeNotifications[]> {
        const notifications = await this.notificationService.find({
            event: id
        });

        if (!notifications.length) {
            return [];
        }

        const attendee = await this.attendeeService.findOne({
            email
        }, {
            model: "notifications",
            path: "notifications.notification",
            select: "-tokens"
        });

        if (!attendee) {
            return [];
        }

        const notificationIds = notifications.map(x => (x._id as mongoose.Types.ObjectId).toHexString());
        return attendee.notifications.filter(x => {
            if (!isNullOrUndefined(seen) && x.seen !== seen || !x.notification) {
                return false;
            }
            return notificationIds.includes((x.notification as Notifications)._id.toHexString());
        });
    }

    public async sendSms(id: string, text: string) {
        const event = await this.findById(id);
        if (!event) {
            throw new EventNotFoundException();
        }

        const ids = event.attendees.map(x => x.attendee);
        const attendees = await this.attendeeService.find({
            _id: {
                $in: ids
            }
        });
        const numbers = attendees.filter(x => x.acceptSMSNotifications).map(x => x.phoneNumber);
        await this.notificationService.sendSms(numbers, text);
    }

    public async confirmAttendee(id: string, email: string, dto: UpdateAttendeeDto, file: Express.Multer.File) {
        const attendee = await this.attendeeService.findOne({
            email
        });
        if (!attendee) {
            throw new UserNotAttendeeException();
        }

        await this.eventsModel.updateOne({
            _id: id,
            "attendees.attendee": attendee._id
        }, {
            "attendees.$.registered": true
        }).exec();

        await this.attendeeService.updateAttendeeInfo({
            email
        }, dto, file);
    }

    public async getAttendeeRole(eventId: string, attendeeId: string): Promise<string> {
        const event = await this.findById(eventId);
        if (!event) {
            throw new EventNotFoundException();
        }

        const attendee = event.attendees.find(x => (x.attendee as mongoose.Types.ObjectId).equals(attendeeId));
        if (!attendee) {
            return null;
        }
        return attendee.role;
    }

    public async getCompetitions(eventId: string, user: UserModel): Promise<Competitions[]> {
        let competitions = user.role.endsWith("admin") || user.role === "director" ? await this.competitionsModel.find({
            event: eventId
        }).populate([{
            path: "activities",
            model: "activities"
        }, {
            path: "directors",
            model: "attendees",
            select: {
                notifications: false
            }
        }]).exec() : await this.competitionsModel.find({
            event: eventId
        }).select({
            activities: true,
            isLive: true,
            onDashboard: true
        }).populate({
            path: "activities",
            model: "activities"
        }).exec();

        if (user.role.endsWith("admin")) {
            return competitions;
        }

        if (user.role === "director") {
            const director = await this.attendeeService.findOne({
                email: user.username
            });
            return competitions.filter(c => c.directors.find(d => {
                return (d as Attendees)._id.toString() === director._id.toString();
            }));
        }

        const attendee = await this.attendeeService.findOne({
            email: user.username
        });
        competitions = competitions.map(competition => {
            const c = competition.toJSON();
            c.activities = ActivitiesService.formatActivities(c.activities, attendee);
            c.isLive = CompetitionsUtils.isLive(competition);
            return c;
        });

        return competitions;
    }

    public async getCompetitionsAsMember(eventId: string, user: UserModel): Promise<Competitions[]> {
        let competitions = await this.competitionsModel.find({
            event: eventId
        }).select({
            activities: true,
            members: true
        }).populate({
            path: "activities",
            model: "activities",
            select: ["name", "subscribers"],
            options: {
                lean: true
            }
        }).lean().exec();

        if (user.role.endsWith("admin")) {
            return competitions;
        }

        const attendee = await this.attendeeService.findOne({
            email: user.username
        });
        competitions = competitions.filter(competition => {
            return competition.members &&
                competition.members.some(m => m.attendees && m.attendees.some(a => attendee._id.equals(a)));
        }).map(competition => {
            competition.activities = ActivitiesService.formatActivities(competition.activities as any, attendee);
            delete competition.members;
            return competition;
        });

        return competitions;
    }

    public async getAttendeesData(eventId: string, type: string, roles: string[]): Promise<any> {
        const event = await this.findById(eventId);
        if (!event) {
            throw new EventNotFoundException();
        }

        const attendees = roles && roles.length ?
            event.attendees.filter(x => roles.some(role => role === x.role)) :
            event.attendees;

        return await this.attendeeService.getFromEvent(eventId, attendees, type);
    }

    public async getAttendeeCv(eventId: string): Promise<any> {
        const attendees = await this.getAttendeesData(eventId, "json", ["attendee", "captain", "godparent"]);

        let files = await this.storageService.getDirectory("cv");
        files = files.filter(file => attendees.some(a => a.cv === file.name));

        const zip = new AdmZip();
        for (const file of files) {
            const attendee = attendees.find(a => a.cv === file.name);
            if (!attendee) {
                continue;
            }

            const [buffer] = await file.download();
            zip.addFile(`${attendee.firstName}_${attendee.lastName}-${file.metadata.metadata.name}`, buffer);
        }

        return zip.toBuffer();
    }

    public async getScore(eventId: string): Promise<EventScore> {
        const competitions = await this.competitionsModel.find({
            event: eventId
        }).select(["name", "weight", "results"])
            .populate([{
                path: "results.teamId",
                model: "teams",
                lean: true,
                populate: {
                    path: "school",
                    model: "schools",
                    lean: true
                }
            }, {
                path: "activities",
                model: "activities",
                lean: true
            }]).lean().exec();

        competitions.forEach(competition => {
            if (!competition.results) {
                competition.results = [];
            }
            let max = 1;
            if (competition.results.length === 1) {
                max = competition.results[0].score;
            } else if (competition.results.length) {
                max = competition.results.reduce((previous, current) => current.score > previous.score ? current : previous).score;
            }
            competition.results = competition.results.map(x => {
                return {
                    ...x,
                    score: x.score ? +((x.score / max) * 100).toFixed(2) : 0
                };
            }).sort((a, b) => a.score > b.score ? -1 : 1);
        });

        return {
            overall: await this.getOverallScore(eventId, competitions),
            competitions: competitions.map(x => {
                const name = (x.activities[0] as Activities).name;
                delete x.activities;
                return {
                    ...x,
                    name,
                    results: x.results.filter(x => x.teamId.school).map(result => {
                        const team = result.teamId as Teams;
                        return {
                            teamId: team._id.toHexString(),
                            teamName: team.name,
                            teamSchoolName: (team.school as Schools).name,
                            score: result.score
                        };
                    })
                };
            })
        };
    }

    public async updateGuide(eventId: string, dto: GuideDto) {
        const event = await this.findById(eventId);
        if (!event) {
            throw new EventNotFoundException();
        }

        await this.update({
            _id: eventId
        }, {
            guide: dto
        } as any);
    }

    public async addGuideSection(eventId: string, dto: AddGuideSectionDto) {
        const event = await this.findById(eventId);
        if (!event) {
            throw new EventNotFoundException();
        }

        const guide = event.guide || {};
        if (guide[dto.type]) {
            return;
        }

        guide[dto.type] = DefaultGuide[dto.type];
        await this.update({
            _id: eventId
        }, {
            guide
        } as any);
    }

    public async updateTemplate(eventId: string, type: string, dto: UpdateTemplateDto) {
        if (EventTemplateTypes.findIndex(x => x === type) < 0) {
            throw new HttpException("Invalid template types", HttpStatus.PRECONDITION_FAILED);
        }

        const event = await this.findById(eventId);
        if (!event) {
            throw new EventNotFoundException();
        }

        let templateId = event.templates?.[type];
        if (!templateId) {
            templateId = await this.templateService.createTemplate({
                name: `${event.name.toLowerCase()}_${type}_account_creation`,
                html: dto.html
            }).then(x => x._id);
        } else {
            await this.templateService.updateTemplate(templateId, {
                html: dto.html
            });
        }

        await this.update({
            _id: eventId
        }, {
            templates: {
                ...event.templates,
                [type]: templateId
            }
        } as any);
    }

    public async getTemplate(eventId: string, type: string): Promise<Template> {
        const event = await this.findById(eventId);
        if (!event) {
            throw new EventNotFoundException();
        }

        if (!event.templates) {
            return;
        }

        let templateId = event.templates[type];
        if (!templateId) {
            return;
        }

        return this.templateService.getTemplate(templateId);
    }

    public async getScoreFiltered(eventId: string): Promise<EventScore> {
        let score = await this.getScore(eventId);
        let teams = await this.teamsModel.find({ event: eventId }).exec();

        let teamsIdToRemove = teams.filter((team: Teams) => {
            return team.showOnScoreboard === false;
        }).map(t => t._id.toHexString());

        let filteredOverallScores = score.overall.filter((score: TeamScore) => {
            return teamsIdToRemove.indexOf(score.teamId) === -1;
        });

        let filteredCompetitionsScores = score.competitions.map((competition: CompetitionScore) => {
            let result = competition.results;
            if (competition.results) {
                result = competition.results.filter((score: TeamScore) => {
                    return teamsIdToRemove.indexOf(score.teamId) === -1;
                });
            }
            return {
                ...competition,
                results: result
            };
        });

        return { overall: filteredOverallScores, competitions: filteredCompetitionsScores };
    }

    private async getOverallScore(eventId: string, competitions: Competitions[]): Promise<TeamScore[]> {
        const teams = await this.teamsModel.find({
            event: eventId,
            school: {
                $ne: null
            }
        }).select(["_id", "name", "school"])
            .populate([{
                path: "school",
                model: "schools",
                lean: true
            }]).lean().exec();

        const overall: TeamScore[] = [];
        for (const team of teams) {
            overall.push(this.getTeamOverallScore(team, competitions));
        }

        return overall.sort((a, b) => a.score > b.score ? -1 : 1);
    }

    private getTeamOverallScore(team: Teams, competitions: Competitions[]): TeamScore {
        let total = 0;
        for (const competition of competitions) {
            const teamResult = competition.results.find(x => team._id.equals((x.teamId as Teams)._id));
            if (!teamResult) {
                continue;
            }

            total += teamResult.score ? teamResult.score * competition.weight : 0;
        }
        return {
            teamId: team._id.toHexString(),
            teamName: team.name,
            teamSchoolName: (team.school as Schools).name,
            score: +total.toFixed(2)
        };
    }
}
