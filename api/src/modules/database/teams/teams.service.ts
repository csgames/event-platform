import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { STSService } from '@polyhx/nest-services';
import { Model, Types } from 'mongoose';
import { BaseService } from '../../../services/base.service';
import { EmailService } from '../../email/email.service';
import { Attendees } from '../attendees/attendees.model';
import { AttendeesService } from '../attendees/attendees.service';
import { CreateTeamDto, LeaveTeamDto } from './teams.dto';
import {
    AttendeeHasTeamException, AttendeeNotFoundException, AttendeeNotInTeamException, TeamFullException, TeamNotFoundException, TeamAlreadyCreatedException
} from './teams.exception';
import { Teams } from './teams.model';
import { Events } from '../events/events.model';
import { EventsService } from '../events/events.service';

export interface LeaveTeamResponse {
    deleted: boolean;
    team: Teams;
}


@Injectable()
export class TeamsService extends BaseService<Teams, CreateTeamDto> {
    constructor(@InjectModel('teams') private readonly teamsModel: Model<Teams>,
                private readonly attendeesService: AttendeesService,
                private readonly eventsService: EventsService,
                private readonly emailService: EmailService,
                private readonly stsService: STSService) {
        super(teamsModel);
    }

    public async createTeam(createTeamDto: CreateTeamDto, userId: string): Promise<Teams> {
        const team = await this.findOne({name: createTeamDto.name, event: createTeamDto.event});
        const attendee = await this.attendeesService.findOne({userId});
        if (!attendee) {
            throw new AttendeeNotFoundException();
        }
        let attendeeTeam: Teams = await this.findOne({
            attendees: attendee._id, event: createTeamDto.event
        });
        if (attendeeTeam) {
            throw new AttendeeHasTeamException();
        }
        if (team) {
            throw new TeamAlreadyCreatedException();
        }

        return await this.create({
            name: createTeamDto.name,
            event: createTeamDto.event,
            attendees: [Types.ObjectId(attendee._id)]
        });

    }

    public async deleteTeam(teamName: String): Promise<void> {
        let team: Teams = await this.findOne({ name: teamName });
        
        if (!team) {
            throw new TeamNotFoundException();
        }

        return await this.remove({ _id: team.id });
    }

    public async updateTeam(): Promise<void> {

        return null;
    }

    public async leave(leaveTeamDto: LeaveTeamDto): Promise<LeaveTeamResponse> {
        let attendee: Attendees = await this.attendeesService.findOne({_id: leaveTeamDto.attendeeId});
        if (!attendee) {
            throw new AttendeeNotFoundException();
        }

        let team: Teams = await this.findOne({_id: leaveTeamDto.teamId});
        if (!team) {
            throw new TeamNotFoundException();
        }

        let index = team.attendees.indexOf(leaveTeamDto.attendeeId);
        if (index < 0) {
            throw new AttendeeNotInTeamException();
        }
        team.attendees.splice(index, 1);

        // Remove team if it has no attendee.
        if (team.attendees.length === 0) {
            await this.remove({_id: team._id});
            return {
                deleted: true,
                team: null
            };
        }

        // Else save new team.
        return {
            deleted: false,
            team: await team.save()
        };
    }

    public async getTeamFromEvent(eventId: string): Promise<Teams[]> {
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

    public async setTeamToPresent(eventId: string, attendeeId: string): Promise<Teams> {
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
        const event: Events = await this.eventsService.findOne({
            _id: eventId
        });
        if (team.attendees.length >= event.maxTeamMembers) {
            throw new TeamFullException();
        }

        team.attendees.push(Types.ObjectId(attendeeId));

        return team.save();
    }
}
