import { Action } from "@ngrx/store";
import { Activity } from "src/app/api/models/activity";
import { InfoActivityModal } from "../info-activity/info-activity.component";

export enum ScheduleActionTypes {
    LoadActivities = "[Schedule] Load activities",
    ActivitiesLoaded = "[Schedule] Activities loaded",
    ShowActivityInfo = "[Schedule] Show activity info"
}

export class LoadActivities implements Action {
    readonly type = ScheduleActionTypes.LoadActivities;
}

export class ActivitiesLoaded implements Action {
    readonly type = ScheduleActionTypes.ActivitiesLoaded;

    constructor(public activities: Activity[]) { }
}

export class ShowActivityInfo implements Action {
    readonly type = ScheduleActionTypes.ShowActivityInfo;

    constructor(public payload: InfoActivityModal) { }
}

export type ScheduleActions =
    | LoadActivities
    | ActivitiesLoaded
    | ShowActivityInfo;
