import { Action } from "@ngrx/store";
import { Competition } from "src/app/api/models/competition";

export enum CompetitionActionTypes {
    LoadCompetition = "[Competition] Load competition info",
    CompetitionLoaded = "[Competition] Competition info loaded",
    LoadCompetitionError = "[Competition] Competition info error",
}

export class LoadCompetition implements Action {
    readonly type = CompetitionActionTypes.LoadCompetition;

    constructor(public competitionId: string) {}
}

export class CompetitionLoaded implements Action {
    readonly type = CompetitionActionTypes.CompetitionLoaded;

    constructor(public competition: Competition) { }
}

export class LoadCompetitionError implements Action {
    readonly type = CompetitionActionTypes.LoadCompetitionError;
}
export type CompetitionActions =
    | LoadCompetition
    | CompetitionLoaded
    | LoadCompetitionError;
