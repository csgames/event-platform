import { Action } from "@ngrx/store";
import { CreateActivity } from "src/app/api/models/activity";

export enum ActivitiesActionTypes {
    AddActivity = "[Activities] Add activity",
    ActivityAdded = "[Activities] Activity added"
}

export class AddActivity implements Action {
    readonly type = ActivitiesActionTypes.AddActivity;

    constructor(public activity: CreateActivity) { }
}

export class ActivityAdded implements Action {
    readonly type = ActivitiesActionTypes.ActivityAdded;
}

export type ActivitiesAction =
    | AddActivity
    | ActivityAdded;
