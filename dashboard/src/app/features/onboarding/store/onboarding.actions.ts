import { Action } from "@ngrx/store";
import { Attendee } from "src/app/api/models/attendee";

export enum OnboardingActionTypes {
    OnboardAttendee = "[Onboarding] onboard attendee",
    OnboardSuccess = "[Onboarding] onboard success",
    OnboardFailure = "[Onboarding] onboard failure",
    DownloadCv = "[Onboarding] download cv",
    CvDownloaded = "[Onboarding] cv downloaded"
}

export class OnboardAttendee implements Action {
    readonly type = OnboardingActionTypes.OnboardAttendee;

    constructor(public payload: Attendee) {}
}

export class OnboardSuccess implements Action {
    readonly type = OnboardingActionTypes.OnboardSuccess;
}

export class OnboardFailure implements Action {
    readonly type = OnboardingActionTypes.OnboardFailure;
}

export class DownloadCv implements Action {
    readonly type = OnboardingActionTypes.DownloadCv;
}

export class CvDownloaded implements Action {
    readonly type = OnboardingActionTypes.CvDownloaded;
}

export type OnboardingActions =
    | OnboardAttendee
    | OnboardSuccess
    | OnboardFailure
    | DownloadCv
    | CvDownloaded;
