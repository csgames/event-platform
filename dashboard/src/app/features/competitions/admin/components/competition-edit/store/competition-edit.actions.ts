import { Action } from "@ngrx/store";
import { Activity } from "../../../../../../api/models/activity";
import { Attendee } from "../../../../../../api/models/attendee";
import { CompetitionFormDto } from "../../competition-form/dto/competition-form.dto";

export enum CompetitionEditActionTypes {
    SaveCompetitionEdit = "[Competition edit] Save competition edit",
    CompetitionEditSaved = "[Competition edit] Competition edit saved",
    CompetitionEditError = "[Competition edit] Competition edit save error",
    LoadActivities = "[Competition edit] Load activities",
    ActivitiesLoaded = "[Competition edit] Activities loaded",
    LoadDirectors = "[Competition edit] Load directors",
    DirectorsLoaded = "[Competition edit] Directors loaded",
    ModalLoaded = "[Competition edit] Modal loaded",
    ResetStore = "[Competition edit] Reset"
}

export class SaveCompetitionEdit implements Action {
    readonly type = CompetitionEditActionTypes.SaveCompetitionEdit;

    constructor (public payload: { id: string, dto: CompetitionFormDto}) {}
}

export class CompetitionEditSaved implements Action {
    readonly type = CompetitionEditActionTypes.CompetitionEditSaved;
}

export class CompetitionEditError implements Action {
    readonly type = CompetitionEditActionTypes.CompetitionEditError;
}

export class LoadActivities implements Action {
    readonly type = CompetitionEditActionTypes.LoadActivities;
}

export class ActivitiesLoaded implements Action {
    readonly type = CompetitionEditActionTypes.ActivitiesLoaded;

    constructor(public payload: Activity[]) {
    }
}

export class LoadDirectors implements Action {
    readonly type = CompetitionEditActionTypes.LoadDirectors;
}

export class DirectorsLoaded implements Action {
    readonly type = CompetitionEditActionTypes.DirectorsLoaded;

    constructor(public payload: Attendee[]) {
    }
}

export class ModalLoaded implements Action {
    readonly type = CompetitionEditActionTypes.ModalLoaded;
}

export class ResetStore implements Action {
    readonly type = CompetitionEditActionTypes.ResetStore;
}

export type CompetitionEditActions = 
    | SaveCompetitionEdit
    | CompetitionEditSaved
    | CompetitionEditError
    | LoadActivities
    | ActivitiesLoaded
    | LoadDirectors
    | DirectorsLoaded
    | ModalLoaded
    | ResetStore;
