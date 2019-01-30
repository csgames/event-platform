import { Action } from "@ngrx/store";
import { Attendee } from "src/app/api/models/attendee";

export enum OnboardingActionTypes {
    UpdateAttendee = "[Onboarding] update attendee",
    UpdateSuccess = "[Onboarding] update success",
    UpdateFailure = "[Onboarding] update failure"
}

export class UpdateAttendee implements Action {
    readonly type = OnboardingActionTypes.UpdateAttendee;

    constructor(public payload: Attendee) {}
}

export class UpdateSuccess implements Action {
    readonly type = OnboardingActionTypes.UpdateSuccess;
}

export class UpdateFailure implements Action {
    readonly type = OnboardingActionTypes.UpdateFailure;
}

export type OnboardingActions =
    | UpdateAttendee
    | UpdateSuccess
    | UpdateFailure;