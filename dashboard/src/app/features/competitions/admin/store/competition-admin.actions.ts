import { Action } from "@ngrx/store";
import { Activity } from "../../../../api/models/activity";
import { Competition } from "src/app/api/models/competition";

export enum CompetitionsAdminActionTypes {
    LoadCompetitionsAdmin = "[Competition admin] Load competitions admin",
    CompetitionsAdminLoaded = "[Competition admin] Competitions admin loaded",
    CompetitionsAdminError = "[Competition admin] Competitions admin error",
    LoadActivities = "[Competition admin] Load activities",
    ActivitiesLoaded = "[Competition admin] Activities loaded"
}

export class LoadCompetitionsAdmin implements Action {
    readonly type = CompetitionsAdminActionTypes.LoadCompetitionsAdmin;
}

export class CompetitionsAdminLoaded implements Action {
    readonly type = CompetitionsAdminActionTypes.CompetitionsAdminLoaded;

    constructor(public competitions: Competition[]) {
    }
}

export class CompetitionsAdminError implements Action {
    readonly type = CompetitionsAdminActionTypes.CompetitionsAdminError;
}

export class LoadActivities implements Action {
    readonly type = CompetitionsAdminActionTypes.LoadActivities;
}

export class ActivitiesLoaded implements Action {
    readonly type = CompetitionsAdminActionTypes.ActivitiesLoaded;

    constructor(public payload: Activity[]) {
    }
}

export type CompetitionAdminActions =
    | LoadCompetitionsAdmin
    | CompetitionsAdminLoaded
    | CompetitionsAdminError
    | LoadActivities
    | ActivitiesLoaded;
