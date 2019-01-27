import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseService } from '../../../services/base.service';
import { CreateTeamDto, UpdateTeamDto } from './teams.dto';
import { InvalidNameException, TeamAlreadyCreatedException } from './teams.exception';
import { Teams } from './teams.model';

@Injectable()
export class TeamsService extends BaseService<Teams, CreateTeamDto> {
    constructor(@InjectModel('teams') private readonly teamsModel: Model<Teams>) {
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

    public async updateTeam(id: string, updateTeamDto: UpdateTeamDto): Promise<Teams> {
        let name = updateTeamDto.name.trim();
        for (let i = 0; i < name.length; ++i) {
            if (name.charCodeAt(i) > 255) {
                throw new InvalidNameException();
            }
        }
        let team = await this.findOne({ name, event: updateTeamDto.eventId });
        if (team) {
            throw new TeamAlreadyCreatedException();
        }

        return this.update({ _id: id }, { name });
    }

    public async getTeamFromEvent(eventId: string): Promise<Teams[]> {
        return await this.teamsModel.find({
            event: eventId
        }).lean().populate([{
            model: 'attendees',
            path: 'attendees'
        }, {
            model: 'schools',
            path: 'school'
        }]).exec() as Teams[];
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
}
