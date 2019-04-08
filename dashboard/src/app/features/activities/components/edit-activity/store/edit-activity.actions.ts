import { Action } from "@ngrx/store";
import { ActivityFormDto } from "../../activity-form/dto/activity-form.dto";
import { Activity } from "src/app/api/models/activity";

export enum ActivityEditActionTypes {
    SaveActivityEdit = "[Edit Activity] Save activity edit",
    ActivityEditSaved = "[Edit Activity] Activity edit saved",
    ActivityEditError = "[Edit Activity] Activity edit save error",
    LoadActivities = "[Edit Activity] Load activities",
    ActivitiesLoaded = "[Edit Activity] Activities loaded",
    ResetStore = "[Edit Activity] Reset"
}

export class SaveActivityEdit implements Action {
    readonly type = ActivityEditActionTypes.SaveActivityEdit;

    constructor (public payload: { id: string, dto: ActivityFormDto}) {}
}

export class ActivityEditSaved implements Action {
    readonly type = ActivityEditActionTypes.ActivityEditSaved;
}

export class ActivityEditError implements Action {
    readonly type = ActivityEditActionTypes.ActivityEditError;
}

export class LoadActivities implements Action {
    readonly type = ActivityEditActionTypes.LoadActivities;
}

export class ActivitiesLoaded implements Action {
    readonly type = ActivityEditActionTypes.ActivitiesLoaded;

    constructor(public activities: Activity[]) {
    }
}

export class ResetStore implements Action {
    readonly type = ActivityEditActionTypes.ResetStore;
}

export type EditActivityActions =
    | SaveActivityEdit
    | ActivityEditSaved
    | ActivityEditError
    | LoadActivities
    | ActivitiesLoaded
    | ResetStore;
