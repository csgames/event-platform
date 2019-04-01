import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseService } from '../../../services/base.service';
import { Attendees } from '../attendees/attendees.model';
import { Events } from '../events/events.model';
import { CreateTeamDto, UpdateTeamDto } from './teams.dto';
import { InvalidNameException, TeamAlreadyCreatedException } from './teams.exception';
import { Teams } from './teams.model';
import { EventNotFoundException } from '../events/events.exception';
import { UserModel } from '../../../models/user.model';
import { DateUtils } from '../../../utils/date.utils';
type ObjectId = Types.ObjectId;

@Injectable()
export class TeamsService extends BaseService<Teams, CreateTeamDto> {
    constructor(@InjectModel('teams') private readonly teamsModel: Model<Teams>,
                @InjectModel('events') private readonly eventsModel: Model<Events>) {
        super(teamsModel);
    }

    public async createTeam(createTeamDto: CreateTeamDto): Promise<Teams> {
        return await this.create({
            name: createTeamDto.name,
            event: createTeamDto.event,
            attendees: [Types.ObjectId(createTeamDto.attendeeId)],
            school: createTeamDto.school,
            maxMembersNumber: createTeamDto.maxMembersNumber
        });
    }

    public async updateTeam(id: string, updateTeamDto: UpdateTeamDto, eventId: string, user: UserModel): Promise<Teams> {
        await this.checkForLocked(eventId, user);
        const name = updateTeamDto.name.trim();
        for (let i = 0; i < name.length; ++i) {
            if (name.charCodeAt(i) > 255) {
                throw new InvalidNameException();
            }
        }
        const team = await this.findOne({ name, event: eventId });
        if (team) {
            throw new TeamAlreadyCreatedException();
        }

        return this.update({ _id: id }, { name });
    }

    public async getTeamFromEvent(eventId: string): Promise<Teams[]> {
        const event = await this.eventsModel.findOne({
            _id: eventId
        }).exec();
        if (!event) {
            throw new EventNotFoundException();
        }

        const teams = await this.teamsModel.find({
            event: eventId
        }).lean().populate([{
            model: 'attendees',
            path: 'attendees'
        }, {
            model: 'schools',
            path: 'school'
        }]).exec() as Teams[];

        for (let team of teams) {
            team = this.getTeamAttendeeInfo(team, event);
        }

        return teams;
    }

    public async getTeamById(id: string, eventId: string) {
        const event = await this.eventsModel.findOne({
            _id: eventId
        }).exec();
        const team = await this.findOneLean({
            _id: id
        }, [{
            path: 'attendees',
            model: 'attendees'
        }, {
            path: 'school',
            model: 'schools'
        }]);

        return this.getTeamAttendeeInfo(team, event);
    }

    public async getTeamInfo(attendeeId: string, eventId: string): Promise<Teams> {
        const team = await this.findOneLean({
            attendees: attendeeId,
            event: eventId
        }, [{
            path: 'attendees',
            model: 'attendees',
            select: ['email', 'firstName', 'github', 'lastName', 'linkedIn', 'website']
        }, {
            path: 'school',
            model: 'schools'
        }]);
        if (!team) {
            throw new NotFoundException('No team found');
        }

        const event = await this.eventsModel.findOne({
            _id: eventId
        }).exec();
        if (!event) {
            throw new NotFoundException('No event found');
        }

        return this.getTeamAttendeeInfo(team, event);
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

    private getTeamAttendeeInfo(team: Teams, event: Events) {
        const members = event.attendees
            .filter(x => team.attendees.findIndex(a => (a as Attendees)._id.equals(x.attendee as ObjectId)) >= 0);
        for (const member of team.attendees as (Attendees & { role: string, registered: boolean })[]) {
            const eventMember = members.find(x => (x.attendee as ObjectId).equals(member._id));
            if (!eventMember) {
                continue;
            }
            member.role = eventMember.role;
            member.registered = eventMember.registered;
        }

        return team;
    }

    private async checkForLocked(eventId: string, user: UserModel): Promise<void> {
        if (user.role.endsWith('admin')) {
            return;
        }
        const event = await this.eventsModel.findOne({
            _id: eventId
        });
        if (!event) {
            throw new NotFoundException("No event found");
        }

        const now = DateUtils.nowUTC();
        if (now > event.teamEditLockDate && event.teamEditLocked) {
            throw new BadRequestException("Edit locked");
        }
    }

    public async deleteAttendeeFromTeam(eventId: string, attendeeId: string, teamId: string) {
        await this.teamsModel.updateOne({
            _id: teamId,
            event: eventId
        }, {
            $pull: {
                attendees: attendeeId
            }
        }).exec();
    }
}
