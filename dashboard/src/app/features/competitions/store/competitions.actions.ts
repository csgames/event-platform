import { Action } from "@ngrx/store";
import { Competition } from "src/app/api/models/competition";

export enum CompetitionsActionTypes {
    LoadCompetitions = "[Competitions] Load competitions",
    CompetitionsLoaded = "[Competitions] Competitions loaded"
}

export class LoadCompetitions implements Action {
    readonly type = CompetitionsActionTypes.LoadCompetitions;
}

export class CompetitionsLoaded implements Action {
    readonly type = CompetitionsActionTypes.CompetitionsLoaded;

    constructor(public competitions: Competition[]) { }
}

export type CompetitionsActions =
    | LoadCompetitions
    | CompetitionsLoaded;
