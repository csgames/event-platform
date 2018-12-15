import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { STSService } from '@polyhx/nest-services';
import { Model, Types } from 'mongoose';
import { CodeException } from '../../../filters/CodedError/code.exception';
import { BaseService } from '../../../services/base.service';
import { EmailService } from '../../email/email.service';
import { Attendees } from '../attendees/attendees.model';
import { AttendeesService } from '../attendees/attendees.service';
import { CreateOrJoinTeamDto, LeaveTeamDto, UpdateLHGamesTeamDto } from './teams.dto';
import { Code } from './teams.exception';
import { Teams } from './teams.model';
import { EVENT_TYPE_LH_GAMES, Events } from '../events/events.model';
import { EventsService } from '../events/events.service';
import { LHGamesService } from '../../lhgames/lhgames.service';

interface LeaveTeamResponse {
    deleted: boolean;
    team: Teams;
}

@Injectable()
export class TeamsService extends BaseService<Teams, CreateOrJoinTeamDto> {
    constructor(@InjectModel('teams') private readonly teamsModel: Model<Teams>,
                private readonly attendeesService: AttendeesService,
                private readonly lhGamesService: LHGamesService,
                private readonly eventsService: EventsService,
                private emailService: EmailService,
                private stsService: STSService) {
        super(teamsModel);
    }

    public async createOrJoin(createOrJoinTeamDto: CreateOrJoinTeamDto, userId: string): Promise<Teams> {
        const team = await this.findOne({name: createOrJoinTeamDto.name, event: createOrJoinTeamDto.event});
        const attendee = await this.attendeesService.findOne({userId});
        if (!attendee) {
            throw new CodeException(Code.ATTENDEE_NOT_FOUND);
        }
        let attendeeTeam: Teams = await this.findOne({
            attendees: attendee._id, event: createOrJoinTeamDto.event
        });
        if (attendeeTeam) {
            throw new CodeException(Code.ATTENDEE_HAS_TEAM);
        }
        if (team) {
            return this.join(team, createOrJoinTeamDto.event, attendee._id);
        } else {
            const team = await this.create({
                name: createOrJoinTeamDto.name,
                event: createOrJoinTeamDto.event,
                attendees: [Types.ObjectId(attendee._id)]
            });
            const event = await this.eventsService.findById(createOrJoinTeamDto.event);
            if (event.type === EVENT_TYPE_LH_GAMES) {
                await this.lhGamesService.createTeam(team._id);
            }
            return team;
        }
    }

    public async leave(leaveTeamDto: LeaveTeamDto): Promise<LeaveTeamResponse> {
        let attendee: Attendees = await this.attendeesService.findOne({_id: leaveTeamDto.attendeeId});
        if (!attendee) {
            throw new CodeException(Code.ATTENDEE_NOT_FOUND);
        }

        let team: Teams = await this.findOne({_id: leaveTeamDto.teamId});
        if (!team) {
            throw new CodeException(Code.TEAM_NOT_FOUND);
        }

        let index = team.attendees.indexOf(leaveTeamDto.attendeeId);
        if (index < 0) {
            throw new CodeException(Code.ATTENDEE_NOT_IN_TEAM);
        }
        team.attendees.splice(index, 1);

        // Remove team if it has no attendee.
        if (team.attendees.length === 0) {
            await this.remove({_id: team._id});

            const event = await this.eventsService.findById(team.event);
            if (event.type === EVENT_TYPE_LH_GAMES) {
                await this.lhGamesService.deleteTeam(team._id);
            }

            return {deleted: true, team: null};
        }

        // Else save new team.
        return {deleted: false, team: await team.save()};
    }

    public async getTeamFromEvent(eventId: string) {
        const teams = await this.teamsModel.find({
            event: eventId
        }).lean().populate({
            model: 'attendees',
            path: 'attendees',
            populate: { model: 'schools', path: 'school' }
        }).exec() as Teams[];
        const userId: string[] = [];
        teams.forEach(team => {
            userId.push(...(team.attendees as Attendees[]).map(a => a.userId));
        });

        const event = await this.eventsService.findOne({
            _id: eventId
        });
        const res = await this.stsService.getAllWithIds(userId);
        for (const team of teams) {
            for (const attendee of team.attendees as (Attendees & { status: string })[]) {
                attendee.status = this.eventsService.getAttendeeStatusFromEvent(attendee._id, event);
                attendee.user = res.users.find(value => value.id === attendee.userId);
            }
        }

        return teams;
    }

    public async updateLHGamesTeam(userId: string, teamId: string, updateLHGamesTeamDto: UpdateLHGamesTeamDto) {
        const attendee = await this.attendeesService.findOne({ userId });
        const attendeeTeam: Teams = await this.findOne({
            attendees: attendee._id, _id: teamId
        });
        if (!attendeeTeam) {
            throw new CodeException(Code.ATTENDEE_NOT_IN_TEAM);
        }

        await this.lhGamesService.updateTeam(teamId, {
            programmingLanguage: updateLHGamesTeamDto.programmingLanguage
        });
    }

    public async setTeamToPresent(eventId: string, attendeeId: string) {
        const team = await this.findOne({
            event: eventId,
            attendees: attendeeId
        });
        if (team) {
            team.present = true;
            return await team.save();
        }

        return null;
    }

    private async join(team: Teams, eventId: string, attendeeId: string): Promise<Teams> {
        let event: Events = await this.eventsService.findOne({
            _id: eventId
        });
        if (team.attendees.length >= event.maxTeamMembers) {
            throw new CodeException(Code.TEAM_FULL);
        }

        team.attendees.push(Types.ObjectId(attendeeId));

        return team.save();
    }
}
