import { Action } from "@ngrx/store";
import { Team } from "src/app/api/models/team";
import { Attendee } from "src/app/api/models/attendee";

export enum TeamViewActionTypes {
    LoadTeam = "[Team] load team",
    LoadTeamSuccess = "[Team] load team success",
    LoadTeamFailure = "[Team] load team failure",
    UpdateTeamName = "[Team] update team name",
    AddTeamMember = "[Team] add team member",
    AddMemberFailure = "[Team] add member failure",
    AddTeamGodparent = "[Team] add team godparent",
}

export class LoadTeam implements Action {
    readonly type = TeamViewActionTypes.LoadTeam;

    constructor(public teamId?: string) {}
}

export class LoadTeamSuccess implements Action {
    readonly type = TeamViewActionTypes.LoadTeamSuccess;

    constructor(public payload: Team) { }
}

export class LoadTeamFailure implements Action {
    readonly type = TeamViewActionTypes.LoadTeamFailure;
}

export class UpdateTeamName implements Action {
    readonly type = TeamViewActionTypes.UpdateTeamName;

    constructor(public newTeamName: string) { }
}

export class AddTeamMember implements Action {
    readonly type = TeamViewActionTypes.AddTeamMember;

    constructor(public payload: Attendee) { }
}

export class AddTeamGodparent implements Action {
    readonly type = TeamViewActionTypes.AddTeamGodparent;

    constructor(public payload: Attendee) { }
}

export class AddMemberFailure implements Action {
    readonly type = TeamViewActionTypes.AddMemberFailure;

    constructor(public err: any) {}
}

export type TeamViewActions =
    | LoadTeam
    | LoadTeamSuccess
    | LoadTeamFailure
    | UpdateTeamName
    | AddTeamMember
    | AddTeamGodparent
    | AddMemberFailure;
