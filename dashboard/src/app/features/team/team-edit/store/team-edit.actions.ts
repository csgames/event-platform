import { Action } from "@ngrx/store";
import { Team } from "../../../../api/models/team";

export enum TeamEditActionTypes {
    LoadTeams = "[Team edit] Load teams",
    LoadTeamsFailure = "[Team edit] Load teams failure",
    TeamsLoaded = "[Team edit] Teams loaded"
}

export class LoadTeams implements Action {
    readonly type = TeamEditActionTypes.LoadTeams;
}

export class LoadTeamsFailure implements Action {
    readonly type = TeamEditActionTypes.LoadTeamsFailure;
}

export class TeamsLoaded implements Action {
    readonly type = TeamEditActionTypes.TeamsLoaded;

    constructor(public teams: Team[]) {}
}

export type TeamEditActions =
    | LoadTeams
    | LoadTeamsFailure
    | TeamsLoaded;
