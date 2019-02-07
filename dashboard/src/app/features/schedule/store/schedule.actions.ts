import { Action } from "@ngrx/store";
import { Activity } from "src/app/api/models/activity";

export enum ScheduleActionTypes {
    LoadActivities = "[Schedule] Load activities",
    ActivitiesLoaded = "[Schedule] Activities loaded"
}

export class LoadActivities implements Action {
    readonly type = ScheduleActionTypes.LoadActivities;

    constructor (public eventId: string) { }
}

export class ActivitiesLoaded implements Action {
    readonly type = ScheduleActionTypes.ActivitiesLoaded;

    constructor(public activities: Activity[]) { }
}

export type ScheduleActions =
    | LoadActivities
    | ActivitiesLoaded;
