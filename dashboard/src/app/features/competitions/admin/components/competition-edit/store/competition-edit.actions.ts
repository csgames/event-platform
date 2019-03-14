import { Action } from "@ngrx/store";
import { Competition } from "src/app/api/models/competition";

export enum CompetitionEditActionTypes {
    SaveCompetitionEdit = "[Competition edit] Save competition edit",
    CompetitionEditSaved = "[Competition edit] Competition edit saved",
    CompetitionEditError = "[Competition edit] Competition edit save error"
}

export class SaveCompetitionEdit implements Action {
    readonly type = CompetitionEditActionTypes.SaveCompetitionEdit;

    constructor (public competitionId: string) {}
}

export class CompetitionEditSaved implements Action {
    readonly type = CompetitionEditActionTypes.CompetitionEditSaved;
}

export class CompetitionEditError implements Action {
    readonly type = CompetitionEditActionTypes.CompetitionEditError;
}

export type CompetitionEditActions = 
    | SaveCompetitionEdit
    | CompetitionEditSaved
    | CompetitionEditError;
