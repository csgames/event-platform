import { Action } from "@ngrx/store";
import { Activity } from "../../../../api/models/activity";

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

export class LoadActivities implements Action {
    readonly type = CompetitionsAdminActionTypes.LoadActivities;
}

export class ActivitiesLoaded implements Action {
    readonly type = CompetitionsAdminActionTypes.ActivitiesLoaded;

    constructor(public payload: Activity[]) {
    }
}

export type CompetitionAdminActions = LoadCompetitionsAdmin;
