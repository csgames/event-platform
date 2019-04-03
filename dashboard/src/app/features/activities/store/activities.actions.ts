import { Action } from "@ngrx/store";
import { CreateActivity, Activity } from "src/app/api/models/activity";

export enum ActivitiesActionTypes {
    AddActivity = "[Activities] Add activity",
    ActivityAdded = "[Activities] Activity added",
    LoadActivities = "[Activities] Load activities",
    ActivitiesLoaded = "[Activities] Activities loaded",
    ActivitiesError = "[Activities] Activities error",
    EditActivity = "[Activities] Edit activity"
}

export class AddActivity implements Action {
    readonly type = ActivitiesActionTypes.AddActivity;

    constructor(public activity: CreateActivity) { }
}

export class ActivityAdded implements Action {
    readonly type = ActivitiesActionTypes.ActivityAdded;
}

export class LoadActivities implements Action {
    readonly type = ActivitiesActionTypes.LoadActivities;
}

export class ActivitiesLoaded implements Action {
    readonly type = ActivitiesActionTypes.ActivitiesLoaded;

    constructor(public activities: Activity[]) { }
}

export class ActivitiesError implements Action {
    readonly type = ActivitiesActionTypes.ActivitiesError;
}

export class EditActivity implements Action {
    readonly type = ActivitiesActionTypes.EditActivity;

    constructor(public activity: Activity) {}
}

export type ActivitiesAction =
    | AddActivity
    | ActivityAdded
    | LoadActivities
    | ActivitiesLoaded
    | ActivitiesError
    | EditActivity;
