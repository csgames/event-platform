import { Component, Inject } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { CodeException } from "../../../filters/CodedError/code.exception";
import { BaseService } from "../../../services/base.service";
import { AttendeesService } from "../attendees/attendees.service";
import { Attendees } from "../attendees/attendees.model";
import { CreateTeamDto } from "./teams.dto";
import { Teams } from "./teams.model";
import { Code } from "./teams.exception";

// TODO: Add team_size field in event and use that to check team size when joining.
const MAX_TEAM_SIZE = 4;

interface LeaveTeamResponse {
    deleted: boolean;
    team: Teams;
}

@Component()
export class TeamsService extends BaseService<Teams, CreateTeamDto> {
    constructor(@Inject("TeamsModelToken") private readonly teamsModel: Model<Teams>,
                private readonly attendeesService: AttendeesService) {
        super(teamsModel);
    }

    public async join(attendeeId: string, teamId: string): Promise<Teams> {
        let attendee: Attendees = await this.attendeesService.findOne( { _id: attendeeId });
        if (!attendee) {
            throw new CodeException(Code.ATTENDEE_NOT_FOUND);
        }

        let team: Teams = await this.findOne({ _id: teamId });
        if (!team) {
            throw new CodeException(Code.TEAM_NOT_FOUND);
        }

        if (team.attendees.length >= MAX_TEAM_SIZE) {
            throw new CodeException(Code.TEAM_FULL);
        }

        let attendeeTeam: Teams = await this.findOne({
            attendees: attendeeId, event: team.event });
        if (attendeeTeam) {
            throw new CodeException(Code.ATTENDEE_HAS_TEAM);
        }

        team.attendees.push(Types.ObjectId(attendeeId));

        return await team.save();
    }

    public async leave(attendeeId: string, teamId: string): Promise<LeaveTeamResponse> {
        let attendee: Attendees = await this.attendeesService.findOne({ _id: attendeeId });
        if (!attendee) {
            throw new CodeException(Code.ATTENDEE_NOT_FOUND);
        }

        let team: Teams = await this.findOne( { _id: teamId });
        if (!team) {
            throw new CodeException(Code.TEAM_NOT_FOUND);
        }

        let index = team.attendees.indexOf(attendeeId);
        if (index < 0) {
            throw new CodeException(Code.ATTENDEE_NOT_IN_TEAM);
        }
        team.attendees.splice(index, 1);

        // Remove team if it has no attendee.
        if (team.attendees.length === 0) {
            await this.remove({ _id: team._id });
            return { deleted: true, team: null };
        }

        // Else save new team.
        return { deleted: false, team: await team.save() };
    }
}
