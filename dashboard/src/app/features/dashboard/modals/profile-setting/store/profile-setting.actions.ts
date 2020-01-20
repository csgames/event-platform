import { Action } from "@ngrx/store";
import { Attendee } from "../../../../../api/models/attendee";

export enum ProfileSettingActionTypes {
    LoadModal = "[ProfileSetting] Load modal",
    DownloadCv = "[ProfileSetting] Download cv",
    CvDownloaded = "[ProfileSetting] Cv downloaded",
    UpdateAttendee = "[ProfileSetting] Update attendee",
    AttendeeUpdated = "[ProfileSetting] Attendee updated",
    ResetStore = "[ProfileSetting] Reset store"
}

export class LoadModal implements Action {
    readonly type = ProfileSettingActionTypes.LoadModal;
}

export class DownloadCv implements Action {
    readonly type = ProfileSettingActionTypes.DownloadCv;
}

export class CvDownloaded implements Action {
    readonly type = ProfileSettingActionTypes.CvDownloaded;

    constructor(public payload: string) {
    }
}

export class UpdateAttendee implements Action {
    readonly type = ProfileSettingActionTypes.UpdateAttendee;

    constructor(public payload: Attendee) {
    }
}

export class AttendeeUpdated implements Action {
    readonly type = ProfileSettingActionTypes.AttendeeUpdated;
}

export class ResetStore implements Action {
    readonly type = ProfileSettingActionTypes.ResetStore;
}

export type ProfileSettingActions =
    | LoadModal
    | DownloadCv
    | CvDownloaded
    | UpdateAttendee
    | AttendeeUpdated
    | ResetStore;
