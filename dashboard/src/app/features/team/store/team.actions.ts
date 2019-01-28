import { Action } from "@ngrx/store";
import { Team } from "src/app/api/models/team";

export enum TeamActionTypes {
    LoadTeam = "[Team] load team",
    LoadTeamSuccess = "[Team] load team success",
    LoadTeamFailure = "[Team] load team failure",
    UpdateTeamName = "[Team] update team name",
    AddTeamMember = "[Team] add team member",
    AddTeamGodparent = "[Team] add team godparent"
}

export class LoadTeam implements Action {
    readonly type = TeamActionTypes.LoadTeam;
}

export class LoadTeamSuccess implements Action {
    readonly type = TeamActionTypes.LoadTeamSuccess;

    constructor(public payload: Team) { }
}

export class LoadTeamFailure implements Action {
    readonly type = TeamActionTypes.LoadTeamFailure;
}

export class UpdateTeamName implements Action {
    readonly type = TeamActionTypes.UpdateTeamName;

    constructor(public newTeamName: string) { }
}

export class AddTeamMember implements Action {
    readonly type = TeamActionTypes.AddTeamMember;

    constructor(public payload: any) { }
}

export class AddTeamGodparent implements Action {
    readonly type = TeamActionTypes.AddTeamGodparent;

    constructor(public payload: any) { }
}

export type TeamActions =
    | LoadTeam
    | LoadTeamSuccess
    | LoadTeamFailure
    | UpdateTeamName
    | AddTeamMember
    | AddTeamGodparent;
