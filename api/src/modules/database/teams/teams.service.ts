import { Component, Inject } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { CodeException } from "../../../filters/CodedError/code.exception";
import { BaseService } from "../../../services/base.service";
import { AttendeesService } from "../attendees/attendees.service";
import { Attendees } from "../attendees/attendees.model";
import { CreateOrJoinTeamDto, JoinOrLeaveTeamDto } from "./teams.dto";
import { Teams } from "./teams.model";
import { Code } from "./teams.exception";

// TODO: Add team_size field in event and use that to check team size when joining.
const MAX_TEAM_SIZE = 4;

interface LeaveTeamResponse {
    deleted: boolean;
    team: Teams;
}

@Component()
export class TeamsService extends BaseService<Teams, CreateOrJoinTeamDto> {
    constructor(@Inject("TeamsModelToken") private readonly teamsModel: Model<Teams>,
                private readonly attendeesService: AttendeesService) {
        super(teamsModel);
    }

    public async createOrJoin(createOrJoinTeamDto: CreateOrJoinTeamDto, userId: string): Promise<Teams> {
        const team = await this.findOne({name: createOrJoinTeamDto.name});
        const attendee = await this.attendeesService.findOne({userId: userId});
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
            return this.join({
                attendeeId: attendee._id,
                teamId: team._id
            });
        } else {
            return this.create({
                name: createOrJoinTeamDto.name,
                event: createOrJoinTeamDto.event,
                attendees: [Types.ObjectId(attendee._id)]
            });
        }
    }

    public async join(joinTeamDto: JoinOrLeaveTeamDto): Promise<Teams> {
        let team: Teams = await this.findOne({_id: joinTeamDto.teamId});
        if (!team) {
            throw new CodeException(Code.TEAM_NOT_FOUND);
        }

        if (team.attendees.length >= MAX_TEAM_SIZE) {
            throw new CodeException(Code.TEAM_FULL);
        }

        let attendeeTeam: Teams = await this.findOne({
            attendees: joinTeamDto.attendeeId, event: team.event
        });
        if (attendeeTeam) {
            throw new CodeException(Code.ATTENDEE_HAS_TEAM);
        }

        team.attendees.push(Types.ObjectId(joinTeamDto.attendeeId));

        return team.save();
    }

    public async leave(leaveTeamDto: JoinOrLeaveTeamDto): Promise<LeaveTeamResponse> {
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
            return {deleted: true, team: null};
        }

        // Else save new team.
        return {deleted: false, team: await team.save()};
    }
}
