import { Action } from "@ngrx/store";
import { Team } from "../providers/home.service";

export enum HomeActionTypes {
    LoadTeams = "[Home] Load teams",
    LoadTeamsSuccess = "[Home] Load teams success",
    LoadTeamsFailure = "[Home] Load teams failure"
}

export class LoadTeams implements Action {
    public readonly type = HomeActionTypes.LoadTeams;
}

export class LoadTeamsSuccess implements Action {
    public readonly type = HomeActionTypes.LoadTeamsSuccess;

    constructor(public teams: Team[]) {}
}

export class LoadTeamsFailure implements Action {
    public readonly type = HomeActionTypes.LoadTeamsFailure;
}

export type HomeActions =
    | LoadTeams
    | LoadTeamsSuccess
    | LoadTeamsFailure;
