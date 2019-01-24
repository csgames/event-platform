import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { STSService } from '@polyhx/nest-services';
import { Model, Types } from 'mongoose';
import { BaseService } from '../../../services/base.service';
import { EmailService } from '../../email/email.service';
import { Attendees } from '../attendees/attendees.model';
import { AttendeesService } from '../attendees/attendees.service';
import { CreateTeamDto, UpdateTeamDto } from './teams.dto';
import {
    AttendeeHasTeamException, AttendeeNotFoundException, AttendeeNotInTeamException, TeamFullException, TeamNotFoundException, TeamAlreadyCreatedException, InvalidNameException
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

    public async createTeam(createTeamDto: CreateTeamDto): Promise<Teams> {
        return await this.create({
            name: createTeamDto.name,
            event: createTeamDto.event,
            attendees: [Types.ObjectId(createTeamDto.attendeeId)],
            school: createTeamDto.school
        });
    }

    public async updateTeam(id: string, updateTeamDto: UpdateTeamDto): Promise<Teams> {
        let name = updateTeamDto.name.trim();
        for (let i = 0; i < name.length; ++i) {
            if (name.charCodeAt(i) > 255) {
                throw new InvalidNameException();
            }
        }
        let team = await this.findOne({ name: name });
        if (team) {
            throw new TeamAlreadyCreatedException();
        }

        return this.update({ _id: id }, { name });
    }

    public async getTeamFromEvent(eventId: string): Promise<Teams[]> {
        const teams = await this.teamsModel.find({
            event: eventId
        }).lean().populate({
            model: 'attendees',
            path: 'attendees'
        }).exec() as Teams[];

        const userId: string[] = [];
        teams.forEach(team => {
            userId.push(...(team.attendees as Attendees[]).map(a => a.email));
        });

        const event = await this.eventsService.findOne({
            _id: eventId
        });
        const res = await this.stsService.getAllWithIds(userId);
        for (const team of teams) {
            for (const attendee of team.attendees as (Attendees & { status: string })[]) {
                attendee.status = this.eventsService.getAttendeeStatusFromEvent(attendee._id, event);
                attendee.user = res.users.find(value => value.id === attendee.email);
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
